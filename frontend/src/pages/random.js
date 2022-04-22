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
            setRandom(resObject);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    getRandom();
}, [cant]);
  return (
        <div>
            <table>
                <tr>
                        <td>Posicion</td>
                        <td>Numero</td>
                    </tr>
            </table>
            {random.map((numero,index) => {
                return <table>
                    
                    <tr>
                        <td>{index}</td>
                        <td>{numero}</td>
                    </tr>

                </table> 
                
            })
        }

    </div>
  )
}
