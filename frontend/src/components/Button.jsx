
function Button(props){
    return(
        <>
        <Button 
        type={props.type}

        >
            {props.name}

        </Button>
        </>
    );
}

export default Button;