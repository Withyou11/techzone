import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';

const ConfirmDialog = ({ setIsOpenDialog, isOpenDialog, question, action, id }) => {
    const closeBox = () => {
        setIsOpenDialog(false);
    };
    return (
        <div>
            {isOpenDialog && (
                <>
                    <ReactDialogBox
                        closeBox={closeBox}
                        modalWidth="600px"
                        headerBackgroundColor="white"
                        headerTextColor="black"
                        closeButtonColor="black"
                        bodyBackgroundColor="white"
                        bodyTextColor="black"
                    >
                        <div className="h3">{question}</div>
                        <div className="d-flex flex-end">
                            <button className="btn btn-success m-2" style={{ fontSize: 16 }} onClick={() => action(id)}>
                                Yes
                            </button>
                            <button className="btn btn-danger m-2" style={{ fontSize: 16 }} onClick={closeBox}>
                                No
                            </button>
                        </div>
                    </ReactDialogBox>
                </>
            )}
        </div>
    );
};

export default ConfirmDialog;
