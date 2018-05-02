import React, {Component} from 'react'

import "../styles/NewPersonZoom.less"
import block from "../helpers/BEM";

const b = block("NewPersonZoom");

class NewPersonZoom extends Component {


    render() {
        return (
            <div className={b()}>
                <div className={b("left")}>
                    <img className={b("img")}
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Alexis_I_of_Russia_%281670-1680s%2C_GIM%29.jpg/200px-Alexis_I_of_Russia_%281670-1680s%2C_GIM%29.jpg"
                         alt=""/>
                    <div className={b("info")}>
                        <img className={b("png")} src="https://png.icons8.com/metro/1600/crown.png" alt=""/>
                        <h3 className={b("name")} data-text="Maria">Олексій</h3>
                        <h3 className={b("surname")}
                            data-text="Romanova">Романов</h3>
                    </div>
                    <div className={b("link-wrap")}><a className={b("link")} href="https://uk.wikipedia.org/wiki/%D0%9E%D0%BB%D0%B5%D0%BA%D1%81%D1%96%D0%B9_%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%D0%B8%D1%87">Wiki</a></div>

                </div>
                <div className={b("right")}>
                    <div>
                        <h4>Важливе:</h4>
                        <ul>
                            <li>Другий московський цар (1645—76)</li>
                            <li>Повний титул: «Божою милістю Великий Государ, Цар і Великий князь, всієї Великої й Малої, й Білої Росії самодержець, і багатьох держав і земель Східних і Західних, і Північних отчич і дідич, і спадкоємець, і государ, і власник»</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Головні події:</h4>
                        <ul>
                            <li>У 1654—1656 і 1660—1667 роках вів війну з Річчю Посполитою.</li>
                            <li>Уклав Віленське перемир'я 1656 року</li>
                            <li>В результаті Андрусівського перемир'я 1667 та «Вічного миру» 1686, Річ Посполита й Московське царство розділили між собою Україну по Дніпру, Київ дістався Москві.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewPersonZoom;

