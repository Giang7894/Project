const app=require("./app");
const config=require("./app/config");
const MongoDB = require("./app/urtils/mongodb.util");
require('./app/auth/passport');

async function startServer(){
    try {
        await MongoDB.connect(config.db.uri);
        console.log(`Connect to database`);

        const PORT=config.app.port;
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("error");
        process.exit();
    }
}

startServer();