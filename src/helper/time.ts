import moment from "moment-timezone"

export function formatDateTime(date: Date) {
    return moment(date)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss")
}

export function getDateRangeLabel(startDate: Date, endDate: Date){
    var dateLabel: string = ""
    const layout = "YYYY MMM DD"
    if (moment(startDate).isSame(endDate)) {
        dateLabel = moment(startDate).format(layout)
    }else{
        dateLabel = `${moment(startDate).format(layout)} - ${moment(endDate).format(layout)}`
    }
    return dateLabel

}