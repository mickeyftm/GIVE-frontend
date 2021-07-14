import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import {Heading, Card, CardBody, Flex, ArrowForwardIcon, Text} from '@pancakeswap/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'

const TimerContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 5%;
`

const DaysCircle = styled.div`
    padding-top: 60px;
`
const HoursCircle = styled.div`
    paddingTop: 30px;
`

const BlueCircle = styled.div`
  background-image: linear-gradient(29deg, #9895DB, #67B4EB);
  border-radius: 50%;
  width: 200px;
  height: 200px;
`

const BlueCircleText1 = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 70px;
  position: relative;
  padding-top: 22%;
`

const BlueCircleText2 = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 70px;
  position: relative;
  padding-top: 20%;
`

const BlueCircleText3 = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 70px;
  position: relative;
  padding-top: 20%;
`

const BlueCircleTextA = styled.div`
  font-family: 'Tw Cen MT'; 
  color: white;
  text-align: center;
  font-size: 50px;
  position: relative;
  // margin-top: 20%;
`
const CountDownTitle = styled.div`
    text-align: center;
    font-size: 42px; 
    color: #9895DB;
    padding-bottom: 10px;
`


const CountdownTimer = () => {
    const { t } = useTranslation()

    const finishTime = new Date("July 21, 2021 11:00:00").getTime()
    const currentTime = new Date().getTime()

    const timeLeft = finishTime - currentTime

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div>
            <CountDownTitle>Countdown to Launch</CountDownTitle>
            <TimerContainer>
                <DaysCircle>
                    <BlueCircle>
                        <BlueCircleText1> {days} </BlueCircleText1>
                        <BlueCircleTextA>Days</BlueCircleTextA>
                    </BlueCircle>
                </DaysCircle>
                <HoursCircle>
                    <BlueCircle>
                        <BlueCircleText2 > {hours} </BlueCircleText2>
                        <BlueCircleTextA>Hours</BlueCircleTextA>
                    </BlueCircle>
                </HoursCircle>
                <DaysCircle>
                    <BlueCircle>
                        <BlueCircleText3> {minutes} </BlueCircleText3>
                        <BlueCircleTextA>minutes</BlueCircleTextA>
                    </BlueCircle>
                </DaysCircle>

            </TimerContainer>
        </div>


    )
}

export default CountdownTimer