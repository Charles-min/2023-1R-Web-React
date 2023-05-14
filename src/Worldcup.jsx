import { useEffect, useState } from 'react'
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

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);
    const [showImg, setShowImg] = useState(false);

    useEffect(() => {
        let timer;
        if(showImg){
            timer = setTimeout(()=> setShowImg(false), 3000);
        }
        return () => clearTimeout(timer);
    })
    const handleClick = () => {setShowImg(true)};
    
    useEffect(() => {
        setGame(candidate.map(c => {
            return{name: c.name, src: c.src, order: Math.random()};
        }).sort((l, r) => {
            return l.order - r.order;
        }))
    }, []);

    useEffect(()=>{
        if(game.length > 1 && round+1 > game.length/2)
        {
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    }, [round]);

    
    
    if(game.length === 1)
    {
        return <div className='ibox'> 
            <div className='ibox-title'>이상형 월드컵 우승</div>
            <img src={game[0].src} /> <p>{game[0].name}</p>
        </div>
    }
    if(game.length === 0 || round + 1 > game.length/2) return <p>로딩중</p>;
    return <div className='ibox-content'>
            <div className='ibox-title'>추억의 명작 이상형 월드컵 {round + 1}/{game.length/2} <b>{game.length === 2 ? "결승": game.length+"강"}</b></div>    
            <img className='wleft' src={game[round*2].src} onClick={() =>{
                setNextGame((prev) => prev.concat(game[round*2]));
                setRound(round => round +1);
                handleClick;
                {showImg && 
                    <div className='center-img'>
                        <img src={game[round*2].src}></img>
                    </div>}
            }}/>

            <img className='wright' src={game[round*2+1].src} onClick={() =>{
                setNextGame((prev) => prev.concat(game[round*2+1]));
                setRound(round => round +1);
                handleClick;
                {showImg && 
                    <div className='center-img'>
                        <img src={game[round*2+1].src}></img>
                    </div>}
            }}/>
            <div className='ibox-info'>
                <span className='l-info'>{game[round*2].name}</span> 
                <span className='r-info'>{game[round*2+1].name}</span>
            </div>
        </div>
}

export default Worldcup;


/*  */