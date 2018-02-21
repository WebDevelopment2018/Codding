import React from 'react'
import "../styles/Layout.less";
import TreeNode from "./TreeNode";

class FamilyTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: []
        }

    }

    componentDidMount() {
        this.getData(this.props.familyName)
    }

    getData(familyName) {
        fetch("http://localhost:3000/" + familyName)
            .then((result) => {
                return result.json();
            }).then((data) => {
            let tree = data.map(person => {
                return (<TreeNode
                    name={person.name}
                    surname={person.surname}
                    imgSrc={person.photo}
                    birthday={person.birthday}
                    death={person.death}
                />)
            });

            this.setState({tree: tree});
        })
    }

    render() {
        return (
            <section className="FamilyTree">
                {this.state.tree}
            </section>
        )
    }
}

export default FamilyTree;