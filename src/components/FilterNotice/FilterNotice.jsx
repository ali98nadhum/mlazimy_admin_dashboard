import React, { useEffect, useState } from 'react'
import "./FilterNotice.css";
import Button from '@mui/material/Button';
import {useStore} from "../../store";

const FilterNotice = () => {

  const [SelectedClass, setSelectedClass] = useState("");

  const { fetchUsersNotice} = useStore((state) => ({
    fetchUsersNotice: state.fetchUsersNotice,
  }));

  useEffect(() => {
    fetchUsersNotice(SelectedClass);
  }, [fetchUsersNotice, SelectedClass]);


 
  
    
  return (
    <div className='filter-notice'>
      <Button variant="outlined" onClick={() => setSelectedClass("")}>الكل</Button>
      <Button variant="outlined" onClick={() => setSelectedClass("A")}>شعبه A</Button>
      <Button variant="outlined" onClick={() => setSelectedClass("B")}>شعبه B</Button>
      <Button variant="outlined" onClick={() => setSelectedClass("C")}>شعبه C</Button>
      <Button variant="outlined" onClick={() => setSelectedClass("D")}>شعبه D</Button>
      <Button variant="outlined" onClick={() => setSelectedClass("E")}>شعبه E</Button>
      <Button variant="outlined" onClick={() => setSelectedClass("F")}>شعبه F</Button>
      <Button variant="outlined" onClick={() => setSelectedClass("مسائي")}>المسائي</Button>
    </div>
  )
}

export default FilterNotice
