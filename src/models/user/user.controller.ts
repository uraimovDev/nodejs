import { Request, Response } from "express";
import { PrismaService } from "../../lib/prisma";

export class UserController {
    private prismaService: PrismaService

    constructor() {
        this.prismaService = new PrismaService;
    }

    async getAll(req: Request, res: Response) {
        const search: string = req.query.search?.toString() || ''
        const data = await this.prismaService.user.findMany({
            where: {
                full_name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            include: {                
                comments: {
                    take: 3
                }
            }
        })
        return res.json({data})
    }

    async create(req: Request, res: Response) {
        const {full_name, username, phone_number} = req.body

        if (!full_name || !username || !phone_number) {
            return res.status(422).json({message: "Give full data"})
        }

        const existUser = await this.prismaService.user.findFirst({
            where: {
                username
            }
        });

        if (existUser) {
            return res.status(422).json({message: 'This user already exist'});
        }

        const user =  await this.prismaService.user.create({
            data: {
                username,
                full_name,
                phone_number
            }
        })

        return res.json({data: user})
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { username, full_name, phone_number } = req.body;

        if(!(username || full_name || phone_number)) {
            return res.status(422).json({message: "Give full data "});
        }

        const user = await this.prismaService.user.findUnique({
            where: { id: Number(id) }
        })

        if(!user){
            return res.status(404).json({mesasge: "User not found"})
        }
        
        return res.json({ data: user });    
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if(!id) {
            return res.status(404).json({message: "User id is required"})
        }

        const user = await this.prismaService.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        await this.prismaService.user.delete({
            where: {
                id: Number(id)
            }
        })
        
        return res.json({message: "User deleted successfully"})
    }
}
