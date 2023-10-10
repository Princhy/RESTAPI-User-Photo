import { Entity, Column,PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Photo{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url:string

    @Column({length:250})
    description:string

    @Column({default:false})
    profil:boolean

    @ManyToOne(()=>User,(user)=>user.photos)
    user :User

}