/**
 * Created by leo on 20/06/06.
 * @author leo.wang 17503046966@163.com;
 */

interface Date_String_Defailt {
  date_bracket?: "-" | string;
  hms_bracket?: ":" | string;
}

interface Date_Pattern extends Date_String_Defailt {
  date: Date;
  need_hms?: boolean;
}

interface Date_String_Pattern extends Date_String_Defailt {
  date: string;
}

class DateUtil {
  constructor() {}
  /**
   * Make Date by date string like pattern of yyyy-mm-dd hh:mm:ss
   * @param date string of date
   * @returns Date
   */
  public makeDate(dsp: Date_String_Pattern): Date {
    const { date, date_bracket, hms_bracket } = dsp;
    const exploder_date_hms = date.split(" ");
    const exploder_date = exploder_date_hms[0];
    const exploder_hms = exploder_date_hms[1];
    // year｜month｜day
    let date_str_array: string[] = [];
    let split_date = "-";
    if (date_bracket) {
      split_date = date_bracket;
    }
    date_str_array = exploder_date.split(split_date);
    const date_number_arr: number[] = this.map(date_str_array, (n) =>
      parseInt(n)
    );
    let hms_array: any = [];
    if (exploder_hms && exploder_hms.length > 0) {
      // hour｜minute｜second
      let split_hms = ":";
      if (hms_bracket) {
        split_hms = hms_bracket;
      }
      hms_array = this.map(exploder_hms.split(split_hms), (n) => parseInt(n));
    }
    const h = hms_array[0] ? hms_array[0] : 0;
    const m = hms_array[1] ? hms_array[1] : 0;
    const s = hms_array[2] ? hms_array[2] : 0;

    return new Date(
      date_number_arr[0],
      date_number_arr[1] - 1,
      date_number_arr[2],
      h,
      m,
      s
    );
  }

  /**
   * Format Date to a date string
   * @param fp The Type like
   * @returns date string like yyyy-mm-dd hh:mm:ss;
   */
  public makeString(fp: Date_Pattern): string {
    const { date, need_hms, date_bracket, hms_bracket } = fp;

    const Year = date.getFullYear(); //年份
    const Months =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1; //月份下标是0-11
    const Day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //具体的天数
    const Hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //小时
    const Minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分钟
    const Seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
    let split_date = "-";
    if (date_bracket) {
      split_date = date_bracket;
    }
    let split_hms = ":";
    if (hms_bracket) {
      split_hms = hms_bracket;
    }
    if (need_hms) {
      return (
        Year +
        split_date +
        Months +
        split_date +
        Day +
        " " +
        Hours +
        split_hms +
        Minutes +
        split_hms +
        Seconds
      );
    }
    return Year + split_date + Months + split_date + Day;
  }

  /**
   * 返回两个毫秒间有多少分秒 mm:ss
   * @param millisecond 毫秒
   * @returns
   */
  public millisecondToMinuteAndSecond(millisecond: number): string {
    const minutes = Math.floor(millisecond / 60);
    const sec = Math.round(millisecond % 60);

    let minutes_str = minutes.toString();
    let sec_str = sec.toString();
    if (minutes < 10) {
      minutes_str = "0" + minutes.toString();
    }
    if (sec < 10) {
      sec_str = "0" + sec.toString();
    }
    return minutes_str + " : " + sec_str;
  }

  /**
   * Get one week date's string list by given date
   * @param fs
   * @returns
   */
  public getDateListOfAWeek(fs: Date_Pattern): string[] {
    const dateTime = fs.date.getTime(); // 获取现在的时间
    const dateDay = fs.date.getDay(); //星期
    const oneDayTime = 24 * 60 * 60 * 1000; //一天的时间
    const start_dateTime = dateTime - oneDayTime * dateDay;
    const weeklist = [];
    for (let i = 0; i < 7; i++) {
      fs.date = new Date(start_dateTime + i * oneDayTime);
      weeklist[i] = this.makeString(fs);
    }
    return weeklist;
  }

  /**
   * Get next month date's string list by given date
   * @param fs 
   * @returns 
   */
  public getNextMonthDateList(fs: Date_Pattern): object[] {
    fs.date = new Date(fs.date.getFullYear(), fs.date.getMonth() + 1, 1);
    return this.getCurrentMonthDateList(fs);
  }

  /**
   * Get previous month date's string list by given date
   * @param fs
   * @returns
   */
  public getPrivousMonthDateList(fs: Date_Pattern): object[] {
    fs.date = new Date(fs.date.getFullYear(), fs.date.getMonth() - 1, 1);
    return this.getCurrentMonthDateList(fs);
  }

  /**
   * Get current month date's string list by given date
   * @param date ;
   * @param need_hms ;
   * @param bracket ;
   * @returns ;
   */
  public getCurrentMonthDateList(fs: Date_Pattern): object[][] {
    const { date } = fs;
    const start = this.getTheDayOfMonthFirstDay(date); //当月第一天的星期
    const count = this.countDateOfMonth(date); //当月总天数
    const year = date.getFullYear();
    const month = date.getMonth();

    const preMonthDate = this.getDateOfMonthFirstDate(date, "previouse"); //上一个月的第一天
    const pre_month_count = this.countDateOfMonth(preMonthDate); //上个月的天数

    const pre_month_year = preMonthDate.getFullYear();
    const pre_month_month = preMonthDate.getMonth();

    const nextMonthDate = this.getDateOfMonthFirstDate(date, "next");
    const next_month_year = nextMonthDate.getFullYear();
    const next_month_month = nextMonthDate.getMonth();

    const rl = [];
    let st = 0;
    const len = 7;
    let d = 1;
    let next_d = 1; //下一个月的日期

    let pr_dat: number;
    if (typeof start === "string") {
      pr_dat = parseInt(start);
    } else {
      pr_dat = start;
    }
    let pre_d = pre_month_count - pr_dat + 1; //上个月开始时间

    const line = 6; //日历的行数
    for (let i = 0; i < line; i++) {
      const y = [];
      for (let j = st; j < st + len; j++) {
        let c_year: number;
        let c_month: number;
        let c_d: number;

        if (i == 0 && j < pr_dat) {
          c_year = pre_month_year;
          c_month = pre_month_month;
          c_d = pre_d;
          pre_d++;
        } else if (j - pr_dat > count - 1) {
          c_year = next_month_year;
          c_month = next_month_month;
          c_d = next_d;
          next_d++;
        } else {
          //当前日期
          c_year = year;
          c_month = month;
          c_d = d;
        }
        fs.date = new Date(c_year, c_month, c_d);
        y.push({
          short: c_d,
          date: this.makeString(fs),
        });
        d++;
      }
      st += len;
      rl.push(y);
    }
    return rl;
  }

  /**
   * Count how long time between two gived second
   * @param second_start ;
   * @param second_end ;
   * @param double ;
   * @returns Pattern like {h:10,m:10,s:10};
   */
  public countHmsBetweenTwoSecond(
    second_start: number,
    second_end?: number,
    double?: boolean
  ) {
    const now = new Date().getTime() / 1000;
    const end = second_end ? second_end : now;
    const long = end - second_start;
    const hours = parseInt((long / (60 * 60)).toString());
    const mins = parseInt(((long - hours * 60 * 60) / 60).toString());
    const second = parseInt((long - hours * 60 * 60 - mins * 60).toString());

    let hours_str = hours.toString();
    let mins_str = mins.toString();
    let second_str = second.toString();

    if (double) {
      if (hours < 10) {
        hours_str = "0" + hours.toString();
      }
      if (mins < 10) {
        mins_str = "0" + mins.toString();
      }
      if (second < 10) {
        second_str = "0" + second.toString();
      }
    }

    return {
      h: hours_str,
      m: mins_str,
      s: second_str,
    };
  }

  /**
   * Count how many days between two date
   * @param start_date
   * @param end_date
   * @returns
   */
  public countDaysBetweenTwoDate(
    end_date: string | Date,
    start_date: string | Date
  ) {
    if (typeof start_date == "string") {
      start_date = this.makeDate({ date: start_date });
    }
    if (typeof end_date == "string") {
      end_date = this.makeDate({ date: end_date });
    }
    const s_time = start_date.getTime();
    const e_time = end_date.getTime();
    const dates = Math.abs(e_time - s_time) / (1000 * 60 * 60 * 24);
    return dates;
  }

  public getToday() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    return new Date(year, month, day);
  }
  public getLastDay() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate() - 1;
    return new Date(year, month, day);
  }

  public getTomorrow() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate() + 1;
    return new Date(year, month, day);
  }
  /******************************************************************************* *
   *
   *
   * 私有变量
   *
   *
   ******************************************************************************* */

  /**
   * 获取这个月第一天的星期
   * @param date 日期
   * @returns
   */
  private getTheDayOfMonthFirstDay(
    date: Date,
    week_list?: string[]
  ): string | number {
    const year = date.getFullYear(); //年份
    const month = date.getMonth(); //年份
    const first_date = new Date(year, month, 1).getDay();
    if (week_list) {
      return week_list[first_date];
    } else {
      return first_date;
    }
  }

  /**
   * 获取当前月/上月个/下个月第一天的日期
   * @param date
   * @param previous_or_next
   * @returns
   */
  private getDateOfMonthFirstDate(
    date: string | Date,
    previous_or_next?: "previouse" | "next"
  ): Date {
    let year: number;
    let month: number;
    if (typeof date == "string") {
      const arr = date.split("-");
      year = parseInt(arr[0]);
      month = parseInt(arr[1]) - 1;
    } else {
      year = date.getFullYear();
      month = date.getMonth();
    }
    if (previous_or_next == "previouse") {
      month--;
    } else if (previous_or_next == "next") {
      month++;
    }
    return new Date(year, month, 1);
  }

  /**
   * 一个月有几天
   * @param date ;
   * @returns ;
   */
  private countDateOfMonth(date: Date) {
    const curMonth = date.getMonth();
    date.setMonth(curMonth + 1);
    date.setDate(0);
    return date.getDate();
  }

  private map<Input, Output>(
    arr: Input[],
    func: (arg: Input) => Output
  ): Output[] {
    return arr.map(func);
  }
}

export default DateUtil;
