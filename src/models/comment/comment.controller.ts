import { Request, Response } from "express";
import { PrismaService } from "../../lib/prisma";

export class CommentController {
    private prismaService: PrismaService

    constructor() {
        this.prismaService = new PrismaService()
    }

    async getAll(req: Request, res: Response) {
        const search: string = req.query.search?.toString() || ''
        const data = await this.prismaService.comment.findMany({
            where: {
                context: {
                    contains: search,
                    mode: 'insensitive'
                },
            }
        })

        return res.json({ data });
    }

    async create(req: Request, res: Response) {
        const { context, user_id } = req.body;

        if (!context || !user_id) {
            return res.status(422).json({ message: "Give full data" })
        }

        const comment = await this.prismaService.comment.create({
            data: {
                context,
                user_id
            }
        })

        return res.json({ data: comment })
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { context } = req.body;

        if (!id || !context) {
            return res.status(422).json({ message: "Give full data" });
        }

        const updatedComment = await this.prismaService.comment.update({
            where: {
                id: Number(id),
            },
            data: {
                context,
            },
        });

        return res.json({ data: updatedComment });

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(422).json({ message: "ID required" });
        }

        await this.prismaService.comment.delete({
            where: {
                id: Number(id),
            },
        });

        return res.json({ message: "Comment deleted successfully" });

    }

}