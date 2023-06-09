import { useEffect, useReducer, useState } from 'react'
import './Worldcup.css'
import pic01 from './assets/기생충_2019.jpg'
import pic02 from './assets/내부자들_2015.jpg'
import pic03 from './assets/다크나이트라이즈.jpg'
import pic04 from './assets/더울프오브스트리트.jpg'
import pic05 from './assets/데드풀.jpg'
import pic06 from './assets/라이언킹.jpg'
import pic07 from './assets/베테랑_2015.jpg'
import pic08 from './assets/신세계_2013.jpg'
import pic09 from './assets/악마를보았다_2010.jpg'
import pic10 from './assets/다크나이트.jpg'
import pic11 from './assets/어벤져스엔드게임.jpg'
import pic12 from './assets/인셉션.jpg'
import pic13 from './assets/인터스텔라.jpg'
import pic14 from './assets/추격자_2008.jpg'
import pic15 from './assets/타짜_2006.jpg'
import pic16 from './assets/해바라기_2006.jpg'

function reducer(state, action){
    if( action.type === "startGame"){
        if(action.value.stat){
            return { ...state, game: action.value.game, stat: action.value.stat };
        }
        else{
            return { ...state, game: action.value.game };
        }
        
        // return {
        //     round : state.round,
        //     nextGame : state.nextGame,  -> 원래 이렇게 적어야 하는 걸
        //     stat : state.stat,             축약해서 
        //     game : action.value,
        // };
    }
    else if(action.type ==="click"){
        //game의 마지막 경기인지 확인
        if(state.game.length > 1 && state.round + 1 >= state.game.length / 2 ){
            return {
                ...state,
                round: 0,
                nextGame: [],
                game: state.nextGame.concat(state.game[action.value]),
                stat: {
                    ...state.stat,
                    [state.game[action.value].name]: state.stat[state.game[action.value].name] + 1
                }
            };
        }
        else{
            return {
                ...state,
                round: state.round + 1,
                nextGame: state.nextGame.concat(state.game[action.value]),
                stat: {
                   ...state.stat,
                    [state.game[action.value].name]: state.stat[state.game[action.value].name] + 1
                }
            };
        }
        
    }
    
    return state;
}

function Worldcup()
{
    const candidate = [
        {name: '기생충', src: pic01},
        {name: '내부자들', src: pic02},
        {name: '다크나이트라이즈', src: pic03},
        {name: '더울프오브더스트리트', src: pic04},
        {name: '데드풀', src: pic05},
        {name: '라이언킹', src: pic06},
        {name: '베테랑', src: pic07},
        {name: '신세계', src: pic08},
        {name: '악마를보았다', src: pic09},
        {name: '다크나이트', src: pic10},
        {name: '어벤져스엔드게임', src: pic11},
        {name: '인셉션', src: pic12},
        {name: '인터스텔라', src: pic13},
        {name: '추격자', src: pic14},
        {name: '타짜', src: pic15},
        {name: '해바라기', src: pic16},
    ];
    const initialState = {
        game: [],
        round: 0,
        nextGame: [],
        stat: {
            '기생충': 0,
            '내부자들': 0,
            '다크나이트라이즈': 0,
            '더울프오브더스트리트': 0,
            '데드풀': 0,
            '라이언킹': 0,
            '베테랑': 0,
            '신세계': 0,
            '악마를보았다': 0,
            '다크나이트': 0,
            '어벤져스엔드게임': 0,
            '인셉션': 0,
            '인터스텔라': 0,
            '추격자': 0,
            '타짜': 0,
            '해바라기': 0  
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    
    
    useEffect(() => {
        const char = localStorage.getItem("2017110922");
        const sInfo = !char ? JSON.parse(char) : {};
        const shuffledCandidate = candidate.map(c => {
            return { name: c.name, src: c.src, order: Math.random() }
        }).sort((l, r) => {
            return l.order - r.order;
        });
        dispatch({ type: "startGame", value: { game: shuffledCandidate, state: sInfo } });
    }, []);
    

    // useEffect(() => {
    //     let timer;
    //     if(showImg){
    //         timer = setTimeout(()=> setShowImg(false), 3000);
    //     }
    //     return () => clearTimeout(timer);
    // })
    const sortedStat = Object.fromEntries(
        Object.entries(state.stat).sort(([, a], [, b]) => b - a)
      );

    if(state.game.length === 1)
    {
        localStorage.setItem("2017110922", JSON.stringify(state.stat));
        return <div className='ibox'> 
            <div className='ibox-title'>이상형 월드컵 우승</div>
            <img src={state.game[0].src} /> <p>{state.game[0].name}</p> <p>{ state.stat[ state.game[0].name] }번 승리</p>
            { <table id="winWorldcupTable">
                <tbody>
                {  
                    Object.keys(sortedStat).map(item => {
                        const name = item
                        const win = state.stat[item]
                        for(var i=0; i<16; i++){
                            if(candidate[i].name === name){
                                var src = candidate[i].src
                            }
                        }
                        return <tr key={name}>
                            <td><img src={src}/></td>
                            <td>{name}</td>
                            <td>{win}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>}
        </div>
    }
    if (state.game.length === 0 || state.round + 1 > state.game.length / 2) return <p>로딩중입니다</p>;
    const left = state.round* 2, right = state.round*2 + 1;
    console.log(state);
   
    return <div className='ibox-content'>
            <div className='ibox-title'>추억의 명작 이상형 월드컵 {state.round + 1}/{state.game.length/2} <b>{state.game.length === 2 ? "결승": state.game.length+"강"}</b></div>    
            <img className='wleft' src={state.game[left].src} onClick={() => {dispatch({ type: "click", value: left })}}/>
            <p className='l-info'>{state.game[left].name}</p>
            <img className='wright' src={state.game[right].src} onClick={() => {dispatch({ type: "click", value: right })}}/>
            <p className='r-info'>{state.game[right].name}</p>
        </div>
}

export default Worldcup;


/*  */