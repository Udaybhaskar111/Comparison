import React from 'react';
import { useEffect } from "react";
import {useForm,useFieldArray, FieldError, FieldErrors} from "react-hook-form";
export default function form() {
    const form=useForm();
    const {register,handleSubmit}=form;
    const setData=(data)=>{
        console.log(data)
    }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit(setData)}>
            <div>
            <label htmlFor="DatabaseType">DataBase Type</label>
            <input type="text" {...register("DatabaseType",{required:"DatabaseType is Mandatory Field"})}/>
            </div>
            <div>
            <label htmlFor="DatabaseName">DataBase Name</label>
            <input type="text" {...register("DatabaseName",{required:"DatabaseName is Mandatory Field"})}/>
            </div>
            <div>
            <label htmlFor="DatabaseType">Port Number</label>
            <input type="text" {...register("port",{required:"PortNumber is Mandatory Field"})}/>
            </div>
            <div>
            <label htmlFor="DatabaseType">DataBase Type</label>
            <input type="text" {...register("DatabaseType",{required:"DatabaseType is Mandatory Field"})}/>
            </div>
            <div>
            <label htmlFor="DatabaseType">DataBase Type</label>
            <input type="text" {...register("DatabaseType",{required:"DatabaseType is Mandatory Field"})}/>
            </div>
            <div>
            <label htmlFor="DatabaseType">DataBase Type</label>
            <input type="text" {...register("DatabaseType",{required:"DatabaseType is Mandatory Field"})}/>
            </div>
        </form>
      
    </div>
  )
}
