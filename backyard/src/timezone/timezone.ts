

export const setTimezone = (timezone: string) => {
    process.env.TZ = timezone;
    const d = new Date();
    console.log(`Time zone set to ${timezone}, Current date time with locale is ${d.toString()}`);
}