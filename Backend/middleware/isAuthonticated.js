import jwt from 'jsonwebtoken'

const isAuthonticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({
                success:false,
                message:"User Not Authorized"
            })
        }

        const decode = await jwt.verify(token,process.env.JWTSECRET)
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        req.id = decode.userId;
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

export default isAuthonticated