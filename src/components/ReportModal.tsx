import React, { useEffect, useState } from "react";

import "./ReportModal.css";

function ReportModal() {
  const reportModal = document.getElementById("ReportModal")!;
  const modalBlocker = document.getElementById("ModalBlocker")!;
  // if (modalIsOpen) {
  //   // OPEN
  //   modalBlocker.style.display = "block";
  //   setTimeout(() => {
  //     modalBlocker.style.backgroundColor = "rgba(0, 0, 0, 0.336)";
  //   }, 100);
  //   setTimeout(() => {
  //     reportModal.style.bottom =
  //       ((window.innerHeight - reportModal.offsetHeight) / 2).toString() +
  //       "px";
  //   }, 200);
  // } else {
  //   setTimeout(() => {
  //     reportModal.style.bottom = "-" + reportModal.style.bottom;
  //   }, 3100);
  //   setTimeout(() => {
  //     modalBlocker.style.backgroundColor = "rgba(0, 0, 0, 0)";
  //   }, 3200);
  //   setTimeout(() => {
  //     modalBlocker.style.display = "none";
  //   }, 4000);
  // }
  //   setInterval(() => {
  //     // OPEN
  //     modalBlocker.style.display = "block";
  //     setTimeout(() => {
  //       modalBlocker.style.backgroundColor = "rgba(0, 0, 0, 0.336)";
  //     }, 100);
  //     setTimeout(() => {
  //       reportModal.style.bottom =
  //         ((window.innerHeight - reportModal.offsetHeight) / 2).toString() + "px";
  //     }, 200);
  //     // CLOSE
  //     setTimeout(() => {
  //       reportModal.style.bottom = "-" + reportModal.style.bottom;
  //     }, 3100);
  //     setTimeout(() => {
  //       modalBlocker.style.backgroundColor = "rgba(0, 0, 0, 0)";
  //     }, 3200);
  //     setTimeout(() => {
  //       modalBlocker.style.display = "none";
  //     }, 4000);
  //   }, 6000);
  return (
    <div className="ModalBlocker" id="ModalBlocker">
      <div className="ReportModal" id="ReportModal">
        <h1>Report Modal</h1>
      </div>
    </div>
  );
}

export default ReportModal;
