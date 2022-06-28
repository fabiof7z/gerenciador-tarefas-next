import type { NextApiRequest, NextApiResponse } from 'next'
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';


  
export default (req : NextApiRequest, res : NextApiResponse<DefaultMsgResponse>) => {
    if (req.method === 'POST'){
        const{login, password} = req.body;
        if(login === 'user' && password ==='senha' ){
            return res.status(200).json({msg:'login autenticado'});
        }
        return res.status(400).json({msg:'Usuario não encontrado'});
    }
    return res.status(405).json({error: 'metodo informado não é permitido'});
}
