import { Entity, Column, PrimaryGeneratedColumn, OneToMany , ManyToMany,JoinTable} from "typeorm"
import { Photo } from "./photo.entity"
import { Project } from "./project.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:50})
    first_name: string

    @Column({length:50})
    last_name: string

    @Column({length:20})
    email:string

    @Column({length:50})
    user_name:string

    @Column()
    password:string

    @OneToMany(()=>Photo,(photo)=>photo.user)
    photos:Photo

    @ManyToMany(()=>Project)
    @JoinTable()
    project:Project[]


}