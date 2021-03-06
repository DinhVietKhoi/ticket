import React, { useEffect, useState } from 'react'
import { CSVLink } from "react-csv";
import dayjs, { Dayjs } from 'dayjs'
import { ref, set, getDatabase, onValue} from 'firebase/database'
import db  from '../firebase'
import Btn from '../components/Btn'
import Search from '../components/Search'
import arrange from '../assets/arrange.png'
import dot from '../assets/Ellipse.png'
import dot1 from '../assets/Ellipse1.png'
import dot2 from '../assets/Ellipse2.png'
import '../sass/ticketManager.scss'
import Status from '../components/Status'
import Calendar from '../components/Calendar'
import Pagigation from '../components/Pagigation'
import ReactPaginate from 'react-paginate'
import ellipsis from '../assets/u_ellipsis-v.png'
import UpdatePackage from '../components/UpdatePackage'
function TicketManager({handleOverlay,handleOverlay1,filter,data,changeDate}) {
  const [dataList,setDataList] = useState()
  // const [arr,setArr] = useState([])
  const [dayObj,setDayObj] = useState(dayjs())

  useEffect(()=>{
    check&&data&&data.map((l,i)=>{
      i===1&&setDataList(data[1])
    })
    
    !check&&data&&data.map((l,i)=>{
      i===1&&setDataList(data[0])
    })
  },[data])
  
  const [checkIndex,setCheckindex] = useState()
  const [radio,setRadio] = useState(true)
  const [radio1,setRadio1] = useState(false)
  const [radio2,setRadio2] = useState(false)
  const [radio3,setRadio3] = useState(false)
  const [checkBox,setCheckbox] = useState(true)
  const [checkBox1,setCheckbox1] = useState(false)
  const [checkBox2,setCheckbox2] = useState(false)
  const [checkBox3,setCheckbox3] = useState(false)
  const [checkBox4,setCheckbox4] = useState(false)
  const [checkBox5,setCheckbox5] = useState(false)
  const [check,setCheck] = useState(true)
  const [className,setClassname] = useState('ticketManager__type--active')
  const [className1,setClassname1] = useState('')
  // changeDate&&console.log(changeDate)
  const handleClick = ()=>{
    data&&data.map((l,i)=>{
      i===1&&setDataList(data[1])
    })
    setClassname('ticketManager__type--active')
    setClassname1('')
    setCheck(true)
  }
  const handleClick1 = ()=>{
    setClassname1('ticketManager__type--active')
    setClassname('')
    setCheck(false)
    data&&data.map((l,i)=>{
      i===0&&setDataList(data[0])
    })
  }
  const [dateEnd,setDateEnd] = useState(dayObj.format(`YYYY/MM/DD`))
  const [dateStart,setDateStart] = useState(dayObj.format(`YYYY/MM/DD`))
  useEffect(()=>{
    setDateEnd(dayObj.format(`YYYY/MM/DD`))
    setDateStart(dayObj.format(`YYYY/MM/DD`))
  },[filter])
  const [filterDate,setFilterDate] = useState(false)
  const handleDayStart = (dayACtive,monthACtive,yearACtive)=>{
        setFilterDate(true)
        dayACtive<10&&(monthACtive+1)<10
        ?
        setDateStart(`${yearACtive}/0${monthACtive+1}/0${dayACtive}`)
        :
        dayACtive<10&&(monthACtive+1)>=10
        ?
        setDateStart(`${yearACtive}/${monthACtive+1}/0${dayACtive}`)
        :
        dayACtive>=10&&(monthACtive+1)<10
        ?
        setDateStart(`${yearACtive}/0${monthACtive+1}/${dayACtive}`)
        :
        setDateStart(`${yearACtive}/${monthACtive+1}/${dayACtive}`)
  }
  const handleDayEnd = (dayACtive,monthACtive,yearACtive)=>{
        setFilterDate(true)
        dayACtive<10&&(monthACtive+1)<10
        ?
        setDateEnd(`${yearACtive}/0${monthACtive+1}/0${dayACtive}`)
        :
        dayACtive<10&&(monthACtive+1)>=10
        ?
        setDateEnd(`${yearACtive}/${monthACtive+1}/0${dayACtive}`)
        :
        dayACtive>=10&&(monthACtive+1)<10
        ?
        setDateEnd(`${yearACtive}/0${monthACtive+1}/${dayACtive}`)
        :
        setDateEnd(`${yearACtive}/${monthACtive+1}/${dayACtive}`)
  }
  const handFilter = ()=>{
    if(check){
      let dataa = []
      if(radio3===true){
         dataa = data&&data[1].filter(f=>f.Status === "HH")
      }
      else if(radio2===true){
         dataa = data&&data[1].filter(f=>f.Status === "CSD")
      }
      else if(radio1===true){
         dataa = data&&data[1].filter(f=>f.Status === "DSD")
      }
      else if(radio===true){
        dataa = data&&data[1].filter(f=>f.Status === "DSD"||f.Status === "CSD"||f.Status === "HH")
      }
      let arr = []
      checkBox&&arr.push(1,2,3,4,5)
      checkBox1&&arr.push(1)
      checkBox2&&arr.push(2)
      checkBox3&&arr.push(3)
      checkBox4&&arr.push(4)
      checkBox5&&arr.push(5)
      const dataaa = [];
      dataa.map(l=>{
        arr.map(arr=>{
          if(arr===l.gateCheck){
            dataaa.push(l)
          } 
        })
      })
      let startDate = new Date(dateStart); 
      // console.log('startDate',startDate)
      let endDate = new Date(dateEnd); 
      let getDateArray = function(start, end) {
          var arr = [];
          var dt = new Date(start);
          while (dt <= end) {
              arr.push(new Date(dt));
              dt.setDate(dt.getDate() + 1);
          }
          return arr;
      }
      let dateArr = getDateArray(startDate, endDate);
      let dateArrFormat = []
      dateArr.map(da=>{
        let date = da.getDate()<10?`0${da.getDate()}`:`${da.getDate()}`
        let month = da.getMonth()+1<10?`0${da.getMonth()+1}`:`${da.getMonth()+1}`
        dateArrFormat.push(`${date}/${month}/${da.getFullYear()}`)
      })
      let dataFinish = []
      dataaa.map(dt=>{
        dateArrFormat.map(dtt=>{
          if(dtt===dt.dateUse){
            dataFinish.push(dt)
          }
        })
      })
      // console.log()
      filterDate?setDataList(dataFinish):setDataList(dataaa)
      handleOverlay()
      setFilterDate(false)
    }
    else if(!check){
      let dataa = []
      if(radio3===true){
        dataa = data&&data[0].filter(f=>f.Status === "HH")
      }
      else if(radio2===true){
        dataa = data&&data[0].filter(f=>f.Status === "CSD")
      }
      else if(radio1===true){
        dataa = data&&data[0].filter(f=>f.Status === "DSD")
      }
      else if(radio===true){
        dataa = data&&data[0].filter(f=>f.Status === "DSD"||f.Status === "CSD"||f.Status === "HH")
      }
      let arr = []
      checkBox&&arr.push(1,2,3,4,5)
      checkBox1&&arr.push(1)
      checkBox2&&arr.push(2)
      checkBox3&&arr.push(3)
      checkBox4&&arr.push(4)
      checkBox5&&arr.push(5)
      const dataaa = [];
      dataa.map(l=>{
        arr.map(arr=>{
          if(arr===l.gateCheck){
            dataaa.push(l)
          } 
        })
      })
      let startDate = new Date(dateStart); 
      let endDate = new Date(dateEnd); 
      let getDateArray = function(start, end) {
          var arr = [];
          var dt = new Date(start);
          while (dt <= end) {
              arr.push(new Date(dt));
              dt.setDate(dt.getDate() + 1);
          }
          return arr;
      }
      let dateArr = getDateArray(startDate, endDate);
      let dateArrFormat = []
      dateArr.map(da=>{
        let date = da.getDate()<10?`0${da.getDate()}`:`${da.getDate()}`
        let month = da.getMonth()+1<10?`0${da.getMonth()+1}`:`${da.getMonth()+1}`
        dateArrFormat.push(`${date}/${month}/${da.getFullYear()}`)
      })
      let dataFinish = []
      dataaa.map(dt=>{
        dateArrFormat.map(dtt=>{
          if(dtt===dt.dateUse){
            dataFinish.push(dt)
          }
        })
      })
      // console.log()
      filterDate?setDataList(dataFinish):setDataList(dataaa)
      handleOverlay()
      setFilterDate(false)
      handleOverlay()
    }
  }
  const handleRadio = ()=>{
    setRadio1(false)
    setRadio2(false)
    setRadio3(false)
    setRadio(true)
  }
  const handleRadio1 = ()=>{
    setRadio(false)
    setRadio1(!radio1)
    setRadio2(false)
    setRadio3(false)
  }
  const handleRadio2 = ()=>{
    setRadio(false)
    setRadio1(false)
    setRadio2(true)
    setRadio3(false)
  }
  const handleRadio3 = ()=>{
    setRadio(false)
    setRadio1(false)
    setRadio2(false)
    setRadio3(true)
  }
  const handleCheckBox = ()=>{
    setCheckbox(true)
    setCheckbox1(false)
    setCheckbox2(false)
    setCheckbox3(false)
    setCheckbox4(false)
    setCheckbox5(false)
  }
  const handleCheckBox1 = ()=>{
    setCheckbox(false)
    setCheckbox1(!checkBox1)
  }
  const handleCheckBox2 = ()=>{
    setCheckbox(false)
    setCheckbox2(!checkBox2)
  }
  const handleCheckBox3 = ()=>{
    setCheckbox(false)
    setCheckbox3(!checkBox3)
  }
  const handleCheckBox4 = ()=>{
    setCheckbox(false)
    setCheckbox4(!checkBox4)
  }
  const handleCheckBox5 = ()=>{
    setCheckbox(false)
    setCheckbox5(!checkBox5)
  }
  const [csvData,setCsvData] = useState([])
  const [csvReport,setCsvReport] = useState()
  const headerCsv = [
    { label: "STT", key: "stt" },
    { label: "Booking Code", key: "bookingcode" },
    { label: "S??? v??", key: "sove" },
    { label: "T??nh tr???ng s??? d???ng", key: "tinhtrangsudung" },
    { label: "Ng??y s??? d???ng", key: "ngaysudung" },
    { label: "Ng??y xu???t v??", key: "ngayxuatve" },
    { label: "C???ng check - in", key: "congcheckin" }
  ]
  const headerCsv1 = [
    { label: "STT", key: "stt" },
    { label: "Booking Code", key: "bookingcode" },
    { label: "S??? v??", key: "sove" },
    { label: "T??n s??? ki???n", key: "tensukien" },
    { label: "T??nh tr???ng s??? d???ng", key: "tinhtrangsudung" },
    { label: "Ng??y s??? d???ng", key: "ngaysudung" },
    { label: "Ng??y xu???t v??", key: "ngayxuatve" },
    { label: "C???ng check - in", key: "congcheckin" }
  ]
  useEffect(()=>{
    setCsvData([])
    check&&dataList&&dataList.map(data=>{
      setCsvData(pre  => 
        [
          ...pre,
          {
            "stt":`${data.id}`,
            "bookingcode":data.bookingCode,
            "sove":data.ticketNumber,
            "tinhtrangsudung":data.Status=="CSD"?'Ch??a s??? d???ng':data.Status=='DSD'?"???? s??? d???ng":"H???t h???n",
            "ngaysudung":data.dateUse,
            "ngayxuatve":data.dateSell,
            "congcheckin":`C???ng ${data.gateCheck}`}])
          
    })
    !check&&dataList&&dataList.map(data=>{
      setCsvData(pre  => 
        [
          ...pre,
          {
            "stt":`${data.id}`,
            "bookingcode":data.bookingCode,
            "sove":data.ticketNumber,
            "tensukien":data.eventName,
            "tinhtrangsudung":data.Status=="CSD"?'Ch??a s??? d???ng':data.Status=='DSD'?"???? s??? d???ng":"H???t h???n",
            "ngaysudung":data.dateUse,
            "ngayxuatve":data.dateSell,
            "congcheckin":`C???ng ${data.gateCheck}`}])
    })
  },[dataList])
  useEffect(()=>{
    check&&setCsvReport({
      data: csvData,
      headers: headerCsv,
      filename: 'Danhsachdoisoatve.csv'
    })
    !check&&setCsvReport({
      data: csvData,
      headers: headerCsv1,
      filename: 'Danhsachdoisoatve.csv'
    })
  },[csvData])
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  
  useEffect(() => {
    const endOffset = itemOffset + 10;
    dataList&&setCurrentItems(dataList.slice(itemOffset, endOffset));
    dataList&&setPageCount(Math.ceil(dataList.length / 10));
  }, [itemOffset,dataList]);
  const handlePageClick = (event) => {
    const newOffset = dataList&&(event.selected * 10 % dataList.length);
    setItemOffset(newOffset);
  };
  const handleMouseMove = (e)=>{
    setCheckindex(e.id)
  }
  const [update,setUpdate] = useState()
  const [date,setdaate] = useState(dayObj.format(`DD/MM/YYYY`))
  const handleGetDayJs = (dayACtive,monthACtive,yearACtive) =>{
    dayACtive<10&&(monthACtive+1)<10
    ?
    setdaate(`0${dayACtive}/0${monthACtive+1}/${yearACtive}`)
    :
    dayACtive<10&&(monthACtive+1)>=10
    ?
    setdaate(`0${dayACtive}/${monthACtive+1}/${yearACtive}`)
    :
    dayACtive>=10&&(monthACtive+1)<10
    ?
    setdaate(`${dayACtive}/0${monthACtive+1}/${yearACtive}`)
    :
    setdaate(`${dayACtive}/${monthACtive+1}/${yearACtive}`)
  }
  const handleUpdate = (e)=>{
    setdaate(dayObj.format(`DD/MM/YYYY`))
    handleOverlay1()
    setUpdate(e)
  }
  const handleUpdate1 = ()=>{
    check===true?
    set(ref(db,`ticketList/familyList/${update.id-1}`),{
      Status:update.Status,
      bookingCode:update.bookingCode,
      dateSell:update.dateSell,
      dateUse:date,
      gateCheck:update.gateCheck,
      id:update.id,
      ticketCheck:update.ticketCheck,
      ticketNumber:update.ticketNumber
    })
    :
    set(ref(db,`ticketList/eventList/${update.id-1}`),{
      Status:update.Status,
      bookingCode:update.bookingCode,
      dateSell:update.dateSell,
      dateUse:date,
      gateCheck:update.gateCheck,
      id:update.id,
      ticketCheck:update.ticketCheck,
      ticketNumber:update.ticketNumber,
      eventName:update.eventName,
      typeTicket:update.typeTicket
    })
    handleOverlay1()
  }
  const handleChange = (value)=>{
    if(check){
      const  dataa = data&&data[1].filter(f=>f.ticketNumber.startsWith(value)===true)
      setDataList(dataa)
    }
    else {
      const  dataa = data&&data[0].filter(f=>f.ticketNumber.startsWith(value)===true)
      setDataList(dataa)
    }
  }
  
  return (
    <div className='ticketManager'>
      <div className='ticketManager__container'>
        <h1>Danh s??ch v??</h1>
        <div className='ticketManager__type'>
          <span onClick={handleClick} className={className&&className}>G??i gia ????nh</span>
          <span onClick={handleClick1} className={className1&&className1}>G??i s??? ki???n</span>
        </div>
        <div className='ticketManager__top'>
          <Search placeholde='T??m b???ng s??? v??' input='small' onChange={handleChange}/>
          <div className='ticketManager__handle'>
            <Btn icon={arrange} text='L???c v??' handleClick={handleOverlay}/>
            {
              csvReport&&<div className='btn' style={{marginLeft: '10px',borderRadius: '8px'}}>
                          <CSVLink {...csvReport} className='btn__container'>
                              <span>
                                  Xu???t file(.CSV)
                              </span>
                          </CSVLink>
                        </div>
            }
          </div>
        </div>
        <div className='ticketManager__bottom'>
          <table  className='ticketManager__table'>
            <thead>
              {check&&<tr>
                <th >STT</th>
                <th>Booking code</th>
                <th>S??? v??</th>
                <th>T??nh tr???ng s??? d???ng</th>
                <th>Ng??y s??? dung</th>
                <th>Ng??y xu???t v??</th>
                <th>C???ng check-in</th>
                <th></th>
              </tr>}
              {!check&&<tr>
                <th >STT</th>
                <th>Booking code</th>
                <th>S??? v??</th>
                <th>T??n s??? ki???n</th>
                <th>T??nh tr???ng s??? d???ng</th>
                <th>Ng??y s??? dung</th>
                <th>Ng??y xu???t v??</th>
                <th>C???ng check-in</th>
                <th></th>
              </tr>}
            </thead>
            <tbody>
            {
                check&&currentItems&&currentItems.map((list,index)=>[
                  <tr key={index} style={index%2?{backgroundColor:'#F7F8FB'}:{backgroundColor:'#FFFFFF'}} onMouseMove={()=>handleMouseMove(list)}>
                    <td>{list.id}</td>
                    <td>{list.bookingCode}</td>
                    <td>{list.ticketNumber}</td>
                    {list.Status==='DSD'&&<td><Status status='0' text="???? s??? d???ng" dot={dot}/></td>}
                    {list.Status==='CSD'&&<td><Status status='1' text="Ch??a s??? d???ng" dot={dot1}/></td>}
                    {list.Status==='HH'&&<td><Status status='2' text="H???t h???n" dot={dot2}/></td>}
                    <td>{list.dateUse}</td>
                    <td>{list.dateSell}</td>
                    <td>C???ng {list.gateCheck}</td>
                    <td><img src={ellipsis} className={checkIndex&&checkIndex==list.id?'ticketManager__update':''} style={{opacity: '0', visibility: 'hidden', cursor: 'pointer'}} onClick={()=>handleUpdate(list)}></img></td>
                  </tr>
                ])
              }
              {
                !check&&currentItems&&currentItems.map((list,index)=>[
                  <tr key={index} style={index%2?{backgroundColor:'#F7F8FB'}:{backgroundColor:'#FFFFFF'}} onMouseMove={()=>handleMouseMove(list)}>
                    <td>{list.id}</td>
                    <td>{list.bookingCode}</td>
                    <td>{list.ticketNumber}</td>
                    <td>{list.eventName}</td>
                    {list.Status==='DSD'&&<td><Status status='0' text='???? s??? d???ng' dot={dot}/></td>}
                    {list.Status==='CSD'&&<td><Status status='1' text='Ch??a s??? d???ng' dot={dot1}/></td>}
                    {list.Status==='HH'&&<td><Status status='2' text='H???t h???n' dot={dot2}/></td>}
                    <td>{list.dateUse}</td>
                    <td>{list.dateSell}</td>
                    <td>C???ng {list.gateCheck}</td>
                    <td><img src={ellipsis} className={checkIndex&&checkIndex==list.id?'ticketManager__update':''} style={{opacity: '0', visibility: 'hidden', cursor: 'pointer'}} onClick={()=>handleUpdate(list)} ></img></td>
                  </tr>
                ])
              }
            </tbody>
          </table>
          <Pagigation handlePageClick={handlePageClick} pageCount={pageCount}/>
        </div>
      </div>
      {
        filter&&<div className='ticketManager__filter'>
        <div className='ticketManager__filter-top'>
          <h1>L???c v??</h1>
        </div>
        <div className='ticketManager__filter-main'>
          <div className='ticketManager__filter-date'>
              <div className='ticketManager__filter-date--group'>
                <span>T??? ng??y</span>
                <Calendar handleGetDayJs={handleDayStart} showDate right/>
              </div>
              <div className='ticketManager__filter-date--group'>
                <h3>?????n ng??y</h3>
                <Calendar handleGetDayJs={handleDayEnd} showDate/>
              </div>
          </div>
          <div className='ticketManager__filter-status'>
              <h3>T??nh tr???ng s??? d???ng</h3>
              <div className='ticketManager__filter-status--radio'>
                <div className='ticketManager__filter-status--group'>
                  <input type='radio' checked={radio} onChange={handleRadio}></input>
                  <span>T???t c???</span>
                </div>
                <div className='ticketManager__filter-status--group'>
                  <input type='radio' checked={radio1} onChange={handleRadio1}></input>
                  <span>???? s??? d???ng</span>
                </div>
                <div className='ticketManager__filter-status--group'>
                  <input type='radio' checked={radio2} onChange={handleRadio2}></input>
                  <span>Ch??a s??? d???ng</span>
                </div>
                <div className='ticketManager__filter-status--group'>
                  <input type='radio' checked={radio3} onChange={handleRadio3}></input>
                  <span>H???t h???n</span>
                </div>
              </div>
          </div>
          <div className='ticketManager__filter-check'>
            <h3>C???ng Check - in</h3>
            <div className='ticketManager__filter-list'>
              <div className='ticketManager__filter-list--group'>
                <input type='checkbox' checked={checkBox} onChange={handleCheckBox}></input>
                <span>T???t c???</span>
              </div>
              <div className='ticketManager__filter-list--group'>
                <input type='checkbox' checked={checkBox1} onChange={handleCheckBox1}></input>
                <span>C???ng 1</span>
              </div>
              <div className='ticketManager__filter-list--group'>
                <input type='checkbox' checked={checkBox2} onChange={handleCheckBox2}></input>
                <span>C???ng 2</span>
              </div>
              <div className='ticketManager__filter-list--group'>
                <input type='checkbox' checked={checkBox3} onChange={handleCheckBox3}></input>
                <span>C???ng 3</span>
              </div>
              <div className='ticketManager__filter-list--group'>
                <input type='checkbox' checked={checkBox4} onChange={handleCheckBox4}></input>
                <span>C???ng 4</span>
              </div>
              <div className='ticketManager__filter-list--group'>
                <input type='checkbox' checked={checkBox5} onChange={handleCheckBox5}></input>
                <span>C???ng 5</span>
              </div>
            </div>
          </div>
        </div>
        <div className='ticketManager__filter-bottom'>
          <button onClick={handFilter}>L???c</button>
        </div>
        </div>
      }
      {
        changeDate&&<div className='ticketManager__changeDate'>
                        <div className='ticketManager__changeDate--top'>
                          <span className='ticketManager__changeDate--top--text'>?????i ng??y s??? d???ng v??</span>
                        </div>
                      <div className='ticketManager__changeDate--main'>
                        <div className='ticketManager__changeDate--group'>
                          <span className='ticketManager__changeDate--group--text'>S??? v??</span>
                          <span className='ticketManager__changeDate--group--text'>{update.ticketNumber}</span>
                        </div>
                        <div className='ticketManager__changeDate--group'>
                          <span className='ticketManager__changeDate--group--text'>Lo???i v??</span>
                          <span className='ticketManager__changeDate--group--text'>V?? c???ng - {update.eventName?'G??i s??? ki???n':'G??i gia ????nh'}</span>
                        </div>
                        <div className='ticketManager__changeDate--group'>
                          <span className='ticketManager__changeDate--group--text'>T??n s??? ki???n</span>
                          <span className='ticketManager__changeDate--group--text'>H???i tr??? tri???n l??m h??ng ti??u d??ng 2022</span>
                        </div>
                        <div className='ticketManager__changeDate--group'>
                          <span className='ticketManager__changeDate--group--text'>H???n s??? d???ng</span>
                          <Calendar handleGetDayJs={handleGetDayJs}/>
                        </div>
                      </div>
                      <div className='ticketManager__changeDate--bottom'>
                        <div className='updatePackage__btn'>
                            <div  onClick={handleUpdate} className='updatePackage__btn-child updatePackage__btn--break'>
                                H???y
                            </div>
                            <div  onClick={handleUpdate1} className='updatePackage__btn-child updatePackage__btn--save'>
                                L??u
                            </div>
                        </div>
                      </div>
                    </div>
      }
    </div>
  )
}

export default TicketManager