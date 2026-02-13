import { Request, Response } from "express";
import { PrismaService } from "../../lib/prisma";

export class PlayerController {
    private prismaService: PrismaService

    constructor() {
        this.prismaService = new PrismaService;
    }

    async getAll (req: Request, res: Response ) {
        const search: string = req.query.search?.toString() || ''
        const data = await this.prismaService.player.findMany({
            where: {
                full_name: {
                    contains: search,
                    mode: 'insensitive'
                }

            },
        })
        return res.json({data})
    }

    async create (req: Request, res: Response ) {
        console.log(req.body);
        
        const { full_name , player_number , goals, } = req.body

        if (!full_name || !player_number || !goals ) {
            return res.status(422).json({message: "Give full data"})
        }
        
        const existPlayer = await this.prismaService.player.findFirst({
            where: {
                full_name
            }
        })

        if (existPlayer) {
            return res.status(422).json({message: "This player already exist"})
        }  
        
        const player = await this.prismaService.player.create({
            data: {
                full_name,
                player_number,
                goals
            }
        })

        return res.json({data: player})
    }

}