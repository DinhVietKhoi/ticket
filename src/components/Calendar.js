import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import range from "lodash-es/range"
import '../sass/calendar.scss'
import calendar from '../assets/fi_calendar.png'
import calendar1 from '../assets/u_calendar-alt.png'
import pre from '../assets/Previous.png'
import next from '../assets/Next.png'
function Calendar({text,disable,right,handleGetDayJs}) {
  const [overLay,setOverlay] = useState(false)
  const [checked,setChecked] = useState(true)
  const [check,setCheck] = useState(false)
  const [dayObj,setDayObj] = useState(dayjs())
  const [month,setMonth] = useState('')
  const [month1,setMonth1] = useState('')

  const todayObj = dayjs()
  const [dayACtive,setDayActive] = useState(dayjs().date())
  const [monthACtive,setMonthActive] = useState(dayjs().month())
  const [yearACtive,setYearActive] = useState(dayjs().year())
  const handleClick = ()=>{
    setCheck(!check)
    setOverlay(true)
    handleGetDayJs(dayACtive,monthACtive,yearACtive)

  }
  useEffect(()=>{
    setMonth(dayObj.format(`M, YYYY`))
    setMonth1(dayObj.format(`DD/MM/YYYY`))
    
  },[dayObj])
  

  const daysWeek = ['CN','T2','T3','T4','T5','T6','T7']
  const daysInMonth = dayObj.daysInMonth()
  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"))
  }

  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"))
  }

  const thisYear = dayObj.year()
  const thisMonth = dayObj.month()
  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
  const weekDayOf1 = dayObjOf1.day()
  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
  const weekDayOfLast =  dayObjOfLast.day()

//   var startDate = new Date("2029-10-01"); //YYYY-MM-DD
// var endDate = new Date("2030-10-07"); //YYYY-MM-DD

// var getDateArray = function(start, end) {
//     var arr = new Array();
//     var dt = new Date(start);
//     while (dt <= end) {
//         arr.push(new Date(dt));
//         dt.setDate(dt.getDate() + 1);
//     }
//     return arr;
// }

// var dateArr = getDateArray(startDate, endDate);

// // Output
// document.write("<p>Start Date: " + startDate + "</p>");
// document.write("<p>End Date: " + endDate + "</p>");
// document.write("<p>Date Array</p>")
// for (var i = 0; i < dateArr.length; i++) {
//     document.write("<p>" + dateArr[i] + "</p>");
// }
// for (var i = 0; i < dateArr.length; i++) {
//     console.log(dateArr[i])
// }
  const handleGetDay = (i) =>{
    i>=10?setMonth1(dayObj.format(`${i}/MM/YYYY`)):setMonth1(dayObj.format(`0${i}/MM/YYYY`))
    setMonthActive(dayObj.format(`M`)-1)
    setYearActive(dayObj.format(`YYYY`))
    setDayActive(i)
  }
  return (
    <div className="calendar" >
      {
        check&&<div className='calendar__overLay' onClick={handleClick}></div>
      }
      {
        disable&&<div className='calendar__btn' style={{background: '#E0E0E0', opacity: '1'}} >
        {<span>Tháng {month}</span>}
        {
          <img src={!disable?calendar:calendar1}></img>
        }
        
      </div>
      }
      {
        !disable&&<div className='calendar__btn' style={{color:'#A5A8B1'}} onClick={handleClick}>
        {<span>Tháng {month}</span>}
        {
          <img src={!disable?calendar:calendar1}></img>
        }
        
      </div>
      }
      
      {
        check&&
        <div className='calendar__app' style={right?{right:'0'}:{left:'0'}}>
          <div className='calendar__month-current'>
            <span  className='calendar__month-current--btn' onClick={handlePrev}></span>
            {<span className='calendar__month-current--text'>Tháng {month}</span>}
            <span  className='calendar__month-current--btn' onClick={handleNext}></span>
          </div>
          <div className='calendar__changeType'>
            <div className='calendar__changeType-group'>
              <input type='radio' checked={checked&&'checked'} onChange={()=>setChecked(true)}></input>
              <span>Theo ngày</span>
            </div>
            <div className='calendar__changeType-group'>
              <input type='radio' checked={!checked&&'checked'} onChange={()=>setChecked(false)}></input>
              <span>Theo tuần</span>
            </div>
          </div>
          <div className='calendar__days-week'>
            {
              daysWeek.map(dw=>[
                <span key={dw} className='calendar__days-week--text'>{dw}</span>
              ])
            }
          </div>
          <div className='calendar__days-month'>
            {
              range(weekDayOf1).map((i) => (
                <div key={i} className='calendar__days-month--text'>
                  <span style={{opacity: '0.3'}}>
                    {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
                  </span>
                </div>
              ))
            }
            {
              range(daysInMonth).map(i => (
                <div onClick={handleGetDay.bind(this,i+1)} key={i} className={`calendar__days-month--text ${
                  i + 1 === dayACtive &&
                  thisMonth === ~~(monthACtive) &&
                  thisYear === ~~(yearACtive)
                    ? "calendar__days-month--text--active"
                    : ""
                }`}>
                <span className={'calendar__days-month--textt'}
                // style={i===7?{color:'#FFFFFF'}:{color:'#23221F'}}
                >{i+1}</span>
                {
                  <div className='calendar__days-month--text--activee'></div>
                }
              </div>
              ))
            }
            {
              range(6 - weekDayOfLast).map(i => (
                <div  key={i} className='calendar__days-month--text' >
                  <span  style={{opacity: '0.3'}}>{dayObjOfLast.add(i + 1 , "day").date()}</span>
                </div>
              ))
            }
          </div>
        </div>
      }
      
    </div>
  )
}

export default Calendar