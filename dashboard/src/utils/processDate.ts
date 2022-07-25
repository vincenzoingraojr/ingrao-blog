export const processDate = (date: string) => {
    let today = new Date().getTime();
    let givenDate = parseInt(date);

    let difference = today - givenDate;
    let daysDifference = difference / (1000 * 3600 * 24);

    if (daysDifference >= 1 && daysDifference <= 365) {
        return `${daysDifference.toFixed(0)} ${parseInt(daysDifference.toFixed(0)) > 1 ? "days" : "day"} ago`;
    } else if (daysDifference > 365) {
        return `${(daysDifference / 365).toFixed(0)} ${parseInt((daysDifference / 365).toFixed(0)) > 1 ? "years" : "year"} ago`;
    } else {
        if ((daysDifference * 24) < 1) {
            if ((daysDifference * 24 * 60) < 1) {
                return "Just now";
            } else {
                return `${(daysDifference * 24 * 60).toFixed(0)} ${parseInt((daysDifference * 24 * 60).toFixed(0)) > 1 ? "minutes" : "minute"} ago`;
            }
        } else {
            return `${(daysDifference * 24).toFixed(0)} ${parseInt((daysDifference * 24).toFixed(0)) > 1 ? "hours" : "hour"} ago`;
        }
    }
};
