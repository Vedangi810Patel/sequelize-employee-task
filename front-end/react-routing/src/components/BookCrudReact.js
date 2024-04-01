import React from 'react';

const BookCrudReact = () => {

    const xhttprequst = xhttprequst();

    return (
        <div className='main-div'>
            {/* <h1> Form Creation </h1> */}
            <form onSubmit={PrintValues}>
                <label id='book_id' htmlFor="book_id"> Book Id : </label>
                <input type="number" name="book_id" id="book_id" placeholder="1" /><br />

                <label id='title' htmlFor="title"> Book Name : </label>
                <input type="text" name="title" id="title" placeholder="Cloud Nine" /> <br />

                <label id='book_description' htmlFor="book_description"> Mob No : </label>
                <input type="text" name="book_description" id="book_description" placeholder="Write Something About Book" /> <br />

                <label id='' htmlFor="address"> Address : </label>
                <textarea name="address" rows="5" cols="20" placeholder="type your address here." /> <br />
            </form>
        </div>
    )

}

export default BookCrudReact;