import css from "./ErrorMessage.module.css"

type ErrorMessage = {
    isError: boolean
}

export default function ErrorMessage({ isError }: ErrorMessage) {
    
    if (!isError) return null


    return (
        <p className={css.text}>There was an error, please try again...</p>
    )
}