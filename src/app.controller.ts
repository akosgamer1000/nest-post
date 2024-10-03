import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NewAccountDto } from './newAccont.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  #accconts = [
    {
      id: '1331-4561',
      owner: 'akkos',
      balance: 15000
    },
    {
      id: '1431-4561',
      owner: 'admin',
      balance: 200000
    },
    {
      id: '1531-4561',
      owner: 'helo',
      balance: 170
    }
  ]
  @Get("/register")
  @Render("reg.ejs")
  Reg() {
    return{
      errors:[],
      data:{}
    }
  }

  @Post("/register")

  newAccont(@Body() accdata: NewAccountDto,
    @Res() response:Response

) {
  const errors:string[]=[];
  if(!accdata.balance || !accdata.id || !accdata.owner){
    errors.push('minden mezöt kötelezö megadni')
  }
  if(!/^\d{4}-\d{4}$/.test(accdata.id)){
    errors.push("A számlaszám nem megfelelö formátum")
  }
  if(isNaN(accdata.balance)){
      errors.push("szának kell lenie")
  }
  if(accdata.balance<0){
    errors.push("pozitivnak kell lenie ")
  }
    let newAccount = {
      id: accdata.id,
      owner: accdata.owner,
      balance: accdata.balance
    }
    if(errors.length>0){
      response.render('reg.ejs',{errors,data:accdata})
    }


    this.#accconts.push(newAccount)
    response.redirect(303,'/newAcc')

  }
  @Get("newAcc")
  @Render("succes")
  newAcc() {
    return {
      accounts:this.#accconts.length
  
    }
}
  }
