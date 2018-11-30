class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options : ['one', 'two']
        };
    }
    handleRemoveAll() {
        this.setState(() => ({options: []}) )
    } 
    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);        
    }

    handleAddOption(option){
        if(!option){
            return 'Enter a value to add valid Item';
        } else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }


        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }

    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in hands of Computer';

        return(
            <div>
            <Header subtitle={subtitle}/>
            <Action 
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
            />
            <Options 
                options={this.state.options} 
                handleRemoveAll={this.handleRemoveAll}
            />
            <AddOption
                handleAddOption={this.handleAddOption}
            />   
        </div>
        );
    }
}


//STATELESS COMPONENT
const Header = (props) => {
    return (
       <div>
           <h1>{props.title}</h1>
           {props.subtitle && <h2>{props.subtitle}</h2>}           
       </div>
    );    
}
//DEFAULT PROP_VALUE
Header.defaultProps = {
    title: 'Indecision'
}
const Action = (props) => {
    return (
        <div>
            <button disabled={!props.hasOptions} onClick={props.handlePick}>What should i do?</button>
        </div>
    );
}
const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleRemoveAll}>Remove all</button>
        {
            props.options.map((option) => <Option key={option} optionText={option}/> )
        }
        <Option />
        </div>
    );
}
const Option = (props) => {
    return <p>{props.optionText}</p>;
}
//END OF STATELESS COMPONENTS


class AddOption extends React.Component {
    constructor(props){
        super(props);  
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);        
        this.setState(() => ({error}));
        e.target.elements.option.value = '';
    }; 
    
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                <input type="text" name="option"/>    
                <button>Add Option</button>
                </form>
            </div>
        );
    }
}

//DOM RENDER
const appRoot = document.getElementById('app');
ReactDOM.render(<IndecisionApp />, appRoot); 