import { formatDistanceToNow } from 'date-fns'
export const convertTimeStamp = (timeStamp: {
    seconds: number
    nanoseconds: number
}) => {
    const { seconds, nanoseconds } = timeStamp
    // now multiply 1000 to get milliseconds
    const timeStampInMs = new Date(seconds * 1000 + nanoseconds / 1000000)
    // get human readible previous time
    return formatDistanceToNow(timeStampInMs, { addSuffix: true })
}
