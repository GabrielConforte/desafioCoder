import React, {useEffect,useState} from 'react'
//importa use params correctamente
import {useParams} from 'react-router-dom'

export default function Random() {
//crea la constante random y setRandom, ademas de otra variable que useParams
const [random,setRandom] = useState([]);
const {cant} = useParams();
useEffect(() => {
    const getRandom = () => {
        fetch(`http://localhost:3030/api/random/${cant}`, {
            method: "GET",
        })
        .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
            console.log(resObject);
            //hazlo array
            let array = Object.entries(resObject);
            setRandom(array);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    getRandom();
}, [cant]);
  return (
        <div>
                    
            {random.map((numero,index) => {
                return <table key={index} >
                    <tbody>
                        <tr >
                            <td>Pos. {index}</td>
                            <td>{numero[0]} - aparece {numero[1]} {numero[1]===1 ? "vez":"veces"}</td>
                        </tr>
                    </tbody>
                </table>
                
            })
        }

    </div>
  )
}
