import type { NextApiRequest, NextApiResponse } from 'next'
import { UserModel } from '../../models/UserModel';
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';
import { connect } from '../../middlewares/connectToMongoDB';



const registerEndpoint = async (req : NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    try{
        if (req.method === 'POST'){
            const {name,email,password} = req.body;
            if(!name || name.trim().length <2){
                return res.status(400).json({error: 'Nome não é valido'});
            }

            if(!email || email.trim().length <6 || !email.includes('@') || !email.includes('.')){
                return res.status(400).json({error: 'E-mail não é valido'});
            }
            
            if(!password || password.trim().length <6){
                return res.status(400).json({error: 'Nome não é valido'});
            }
            const user ={
                name,
                email,
                password
            }

            await UserModel.create(user);
            
            return res.status(200).json({msg: 'Criado com sucesso'});    

        }
        return res.status(405).json({error: 'metodo informado não é permitido'});
    }catch(e){
        console.log('Error on c reate user', e);
        return res.status(500).json({error:'Não foi possível cadastrar usuário, entre em contato com o dev que fez isso.'});
    }
    
}

export default connect(registerEndpoint);