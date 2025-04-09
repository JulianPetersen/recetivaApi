import LogWorkFlow from '../models/logWorkFlow';


const createLog = async (userEmail, messagge, page,status) => {
    const newLog = new LogWorkFlow({
        userEmail,
        messagge,
        page,
        status
    });
    const savedLog = await newLog.save();
    return {savedLog};
};


module.exports = {
    createLog
};

