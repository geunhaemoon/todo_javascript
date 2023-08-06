
class DateUtils{
    static leftPad(value) {
        if (value >=10) {
            return value;            
        }
        return `0${value}`;
    }

    //js는 월이 0부터 시작이라 1 붙여주기 
    static toStringByFormatting(date) {
        const year = date.getFullYear();
        const month = this.leftPad(date.getMonth() + 1);
        const day = this.leftPad(date.getDate());
        
        return [year, month, day].join("-");
    }
}