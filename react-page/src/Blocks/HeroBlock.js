import React, {Component} from 'react';
import './HeroBlock.css'

class heroBlock extends Component {
  render () {
    let className = this.props.class;
    let headerImage = this.props.imageurls.map((elem, index) => {
      return <div key={index} id={index} className= {className[index] ? 'hero-image ' + className[index] : 'hero-image'} style={{ backgroundImage:`url(${this.props.imageurls[index]})`}}></div>
    });

    let dots = this.props.imageurls.map((elem, index) => {
      return <div key={index} id={index} className={className[index] ? 'dot ' + className[index] : 'dot'} onClick={(e) =>(this.props.idhandler(e))}></div>
    })

      return (
        <div className='hero'>
          {headerImage}
          <div className='dots'>
            {dots}
          </div>
        </div>
      )
  }
}

export default heroBlock;
