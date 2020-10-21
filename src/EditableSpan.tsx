import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [title, setTitle] = useState('')
    let [editMode, setEditMode] = useState(false)
    let activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    let activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    let onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        editMode ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus={true}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}