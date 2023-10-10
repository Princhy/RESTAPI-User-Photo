import { Request,Response, json } from "express"
import { Photo } from "../models/photo.entity"
import myDataSource from "../app-data-source"
import { User } from "../models/user.entity"
import multer, {Multer} from 'multer';
import path from 'path';



// Configure Multer
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, 'photo-'+file.originalname);
    },
  });
  const upload = multer({ storage });

  // Extend the Request interface to include Multer's file property
interface MulterRequest extends Request {
    file: Multer.File;
  }


//get all photo
export const getAllPhotos = async (req:Request,res:Response)=>{
    const photo = await myDataSource.getRepository(Photo).find({ relations: ["user"] })
    return res.json(photo)
}

//get all photo by one user
export const getAllPhotosByUser = async (req:Request, res:Response) => {
    const userId = Number(req.params.userId);
    const photo = await myDataSource.getRepository(Photo).find({ 
        where: { user: { id: userId } },
        relations: ["user"] 
    });
    
    return res.json(photo);
}

//get one photo
export  const getOnePhoto = async (req:Request,res:Response)=>{
    const photo = await myDataSource.getRepository(Photo).findOne({
        where: { id: Number(req.params.id) },
        relations: ["user"]
    })
    if(!photo){
        return res.status(404).json({"msg":"ID not found"})
    }
    return res.json(photo)
}

//Create new photo
// export const createNewPhoto = async (req: Request, res: Response) => {

    
//     try {
//         const userId = Number(req.body.userId);
//         if (isNaN(userId)) {
//             return res.status(400).json({ "msg": "userId doit être un nombre." });
//         }

//         // Récupérez l'utilisateur associé à partir de la base de données
//         const userRepository = myDataSource.getRepository(User);
//         const user = await userRepository.findOne({ where: { id: userId } });

//         if (!user) {
//             return res.status(404).json({ "msg": "Utilisateur non trouvé." });
//         }

//         // Créez une instance de Photo et définissez ses propriétés
//         let photo = new Photo();
//         photo.url = req.body.url;
//         photo.description = req.body.description;

//         // Associez l'utilisateur à la photo
//         photo.user = user;

//         // Enregistrez la photo dans la base de données
//         const photoRepository = myDataSource.getRepository(Photo);
//         await photoRepository.save(photo);

//         return res.json(photo);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ "msg": "Une erreur est survenue lors de la création de la photo." });
//     }
// }

export const createNewPhoto = async (req: MulterRequest, res: Response) => {
    try {
      // Handle file upload
      upload.single('file')(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ "msg": "Erreur lors du téléchargement du fichier." });
        }
  
        const userId = Number(req.body.userId);
        if (isNaN(userId)) {
          return res.status(400).json({ "msg": "userId doit être un nombre." });
        }
  
        // Récupérez l'utilisateur associé à partir de la base de données
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });
  
        if (!user) {
          return res.status(404).json({ "msg": "Utilisateur non trouvé." });
        }
  
        // Créez une instance de Photo et définissez ses propriétés
        let photo = new Photo();
        photo.url = `http://localhost:${process.env.PORT}/static/${req.file.filename}` // Use the path to the uploaded file
        photo.description = req.body.description;
  
        // Associez l'utilisateur à la photo
        photo.user = user;
  
        // Enregistrez la photo dans la base de données
        const photoRepository = myDataSource.getRepository(Photo);
        await photoRepository.save(photo);
  
        return res.json(photo);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "msg": "Une erreur est survenue lors de la création de la photo." });
    }
  };


//update photo
export const updatePhoto =async (req:Request,res:Response) => {
    const photo =await myDataSource.getRepository(Photo).findOneBy({
        id: Number(req.params.id)
    })
    if(!photo){
        return res.status(404).json({"msg":"ID not found"})
    }
    myDataSource.getRepository(Photo).merge(photo, req.body)
    const results = await myDataSource.getRepository(Photo).save(photo)
    return res.json(results)
}

//delete photo
export const deletePhoto =async (req:Request,res:Response) => {
    const photo =await myDataSource.getRepository(Photo).findOneBy({
        id: Number(req.params.id)
    })
    if(!photo){
        return res.status(404).json({"msg":"ID not found"})
    }
    const results = await myDataSource.getRepository(Photo).delete(photo)
    return res.json(results)
    
}