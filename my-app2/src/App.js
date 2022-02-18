import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { emitModify, emitAdd, modifyObj, addObj } from './socket'
import { v1 as uuid } from 'uuid'

const App = () => {
  const [canvas, setCanvas] = useState("");
  const [imgURL, setImgURL] = useState("");
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(
    () => {
      if (canvas) {
        canvas.on('object:modified', function (options) {
          if (options.target) {
            const modifiedObj = {
              obj: options.target,
              id: options.target.id,
            }
            emitModify(modifiedObj)
          }
        })

        canvas.on('object:moving', function (options) {
          if (options.target) {
            const modifiedObj = {
              obj: options.target,
              id: options.target.id,
            }
            emitModify(modifiedObj)
          }
        })

        modifyObj(canvas)
        addObj(canvas)
      }
    },
    [canvas]
  )

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 800,
      width: 800,
      backgroundColor: "pink",
    });

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: "yellow",
    });
    rect.set({id: uuid()})
    canvi.add(rect);
    canvi.renderAll();
    emitAdd({obj: rect, id: rect.id})
  };
  const addImg = (e, url, canvi) => {
    e.preventDefault();
    new fabric.Image.fromURL(url, (img) => {
      img.scale(0.75);
      canvi.add(img);
      canvi.renderAll();
      setImgURL("");
    });
  };
  return (
    <div>
      <h1>Fabric.js on React - fabric.Canvas('...')</h1>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <form onSubmit={(e) => addImg(e, imgURL, canvas)}>
        <div>
          <input
            type="text"
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
          />
          <button type="submit">Add Image</button>
        </div>
      </form>
      <br />
      <br />
      <canvas id="canvas" />
    </div>
  );
};

export default App;
