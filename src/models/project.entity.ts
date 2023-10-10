import { Entity, Column,PrimaryGeneratedColumn ,ManyToMany} from "typeorm";


@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    descri :string

    

}