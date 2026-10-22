'use client'; 

function Error({reset}) {
    return (
        <div className="error">
            <h1>Erreur</h1>
            <p>Oups, une erreur s&apos;est produite</p>

            <button onClick={() => reset()}>Rafraichir</button>
        </div>
    )
}

export default Error;
