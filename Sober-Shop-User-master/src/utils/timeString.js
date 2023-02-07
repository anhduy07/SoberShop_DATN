
const timeString = (str) => {
    const date = new Date(Date.parse(str));
    
    const day = `0${date.getDate()}`.substr(-2,2);
    const month = `0${date.getMonth() + 1}`.substr(-2,2);
    const year = date.getFullYear();

    return `${day}.${month} ${year}`;
};

export default timeString;