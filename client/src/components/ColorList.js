import React, { useState } from "react";

import axiosWithAuth from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, props, updateColors }) => {
  //console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // useEffect(() => {
  //   if (props.colors.length > 0) {
  //     const newColor = props.colors.find(thing => `${thing.id}` === props.match.params.id);
  //     console.log(newColor);
  //     setEditing(newColor);
  //   }
  // }, [props.match.params.id]);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(colors.map(color => {
          if (colorToEdit.id === color.id) {
            return color = res.data
          } else {
            return color
          }
        }));


        props.history.push('/')
      })
      .catch(err => console.log(err.response));
  };


  // const deleteColor = color => {
  //   // make a delete request to delete this color

  //   axiosWithAuth()

  //     .delete(`/colors/${color.id}`)
  //     .then(res => 
  //       console.log(res.data))
  //       props.updateColors(res.data);
  //       props.history.push('/bubblepage');
  //       updateColors(colors.filter(color => {
  //         if (res.data !== color.id) {
  //           return color
  //         }}

  //       ))
  const deleteColor = colors => {

    // make a delete request to delete this color


    axiosWithAuth()
      .delete(`/colors/${colorToEdit.id}`)
      .then(res => {
        console.log(res.data)
        updateColors(res.data);
        props.history.push('/color-list');
      })
      .catch(err => console.log(err.response));
  };


  if (!colors) {
    return <div>Loading  information...</div>;
  }


  return (
    <div className="colors-wrap">
      <p>colors</p>

      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );

}

export default ColorList;
