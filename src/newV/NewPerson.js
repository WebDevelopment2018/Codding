import React, {Component, Fragment} from 'react'

import "../newV/NewPerson.less"
import block from "../helpers/BEM";
import NewPersonZoom from "./NewPersonZoom";

const b = block("NewPerson");

class NewPerson extends Component {


    render() {
        return (
            <Fragment>
            <div className={b()}>
                <div className={b("left")}>
                    <img className={b("img")}
                         src="http://res.cloudinary.com/csucu/image/upload/q_100,h_70,w_95,c_thumb,g_face/v1520238626/maria_romanova_x0sjf2.jpg"
                         alt=""/>
                    <div className={b("info")}>
                        <h3 className={b("name")} data-text="Maria">Maria</h3>
                        <h3 className={b("surname")}
                            data-text="Romanova">Romanova</h3>
                    </div>
                    <div className={b("link-wrap")}><a className={b("link")} href="https://uk.wikipedia.org/wiki/%D0%9C%D0%B0%D1%80%D1%96%D1%8F_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D1%81%D1%8C%D0%BA%D0%B0">Wiki</a></div>

                </div>
                <div className={b("right")}>
                    <img className={b("png")} src="https://png.icons8.com/metro/1600/crown.png" alt=""/>
                    <div>
                        <img className={b("png")}
                             src="https://cdn0.iconfinder.com/data/icons/church-1/502/Untitled-17-512.png"
                             alt=""/>
                    </div>
                    <div><img className={b("png")}
                              src="https://cdn0.iconfinder.com/data/icons/hearts-7/100/rings-512.png" alt=""/>
                        <span>2</span></div>
                    <div><img className={b("png")}
                              src="https://cdn0.iconfinder.com/data/icons/the-middle-ages/500/Knight_swords-512.png"
                              alt=""/>
                        <span>4</span></div>
                </div>
            </div>
            <NewPersonZoom/>
            </Fragment>
        )
    }
}

export default NewPerson;

