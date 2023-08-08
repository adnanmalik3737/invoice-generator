import React from "react";
import { Facebook } from "../../components/Facebook";
import { Google } from "../../components/Google";
import { IconlyBoldLock } from "../../components/IconlyBoldLock";
import { Instagram } from "../../components/Instagram";
import { LomaBoldUser } from "../../components/LomaBoldUser";
import { SolidCommunication } from "../../components/SolidCommunication";
import google2 from '../../img/google2.svg';
import "./style.css";

export  function InvoiceGenerator() {
  return (
    <div className="invoice-generator">
      <div className="div">
        <div className="group">
          <img className="img" alt="Group" src="/img/group-4.png" />
          <div className="heading-finance">Company Logo Here</div>
        </div>
        <div className="overlap">
          <div className="overlap-group">
            <div className="div-wrapper">
              <div className="text-wrapper">Login</div>
            </div>
            <div className="group-2">
              <div className="group-wrapper">
                <div className="group-3">
                  <Google className="design-component-instance-node" google="/img/google-1.svg" />
                  <div className="text-wrapper-2">Google</div>
                </div>
              </div>
              <img className="line" alt="Line" src="/img/line-7.svg" />
              <div className="text-wrapper-3">or</div>
              <div className="group-4">
                <div className="group-5">
                  <div className="text-wrapper-4">Facebook</div>
                  <Facebook className="design-component-instance-node" facebook="/img/facebook-1.svg" />
                </div>
              </div>
              <div className="group-6">
                <div className="group-7">
                  <div className="text-wrapper-5">Instagram</div>
                  <Instagram className="design-component-instance-node" instagram="/img/instagram-1.svg" />
                </div>
              </div>
            </div>
            <div className="text-wrapper-6">Welcome!</div>
            <div className="text-wrapper-7">Login to your account!</div>
            <div className="overlap-2">
              <img className="line-2" alt="Line" src="/img/line-6.svg" />
              <div className="loma-bold-email">
                <div className="email" />
                <img className="vector" alt="Vector" src="/img/vector-341-2.png" />
              </div>
              <div className="text-wrapper-8">Email</div>
            </div>
            <div className="overlap-3">
              <img className="line-2" alt="Line" src="/img/line-6.svg" />
              <div className="text-wrapper-8">Password</div>
              <IconlyBoldLock className="iconly-bold-lock-instance" lockClassName="iconly-bold-lock-2" />
            </div>
          </div>
          <h1 className="h-1">Registration</h1>
          <p className="p">Sign up to get account!</p>
          <div className="overlap-4">
            <img className="line-3" alt="Line" src="/img/line-2.svg" />
            <LomaBoldUser className="design-component-instance-node-2" lomaBoldUser="/img/loma-bold-user-1.svg" />
            <div className="text-wrapper-9">Full Name</div>
          </div>
          <div className="overlap-5">
            <img className="line-3" alt="Line" src="/img/line-6.svg" />
            <div className="loma-bold-email-2">
              <div className="email-2" />
              <img className="vector-2" alt="Vector" src="/img/vector-341-2.png" />
            </div>
            <div className="text-wrapper-9">Email</div>
          </div>
          <div className="overlap-6">
            <img className="line-3" alt="Line" src="/img/line-6.svg" />
            <SolidCommunication
              className="design-component-instance-node-2"
              solidCommunication="/img/solid-communication-phone-1.svg"
            />
            <div className="text-wrapper-9">Phone</div>
          </div>
          <div className="overlap-7">
            <img className="line-3" alt="Line" src="/img/line-6.svg" />
            <IconlyBoldLock className="iconly-bold-lock-3" lockClassName="iconly-bold-lock-4" />
            <div className="text-wrapper-9">Password</div>
          </div>
          <div className="overlap-8">
            <div className="text-wrapper-10">Create Account</div>
          </div>
          <div className="group-8">
            <div className="overlap-9">
              <div className="group-3">
                <Google className="design-component-instance-node" google="../../img/google-2.svg" />
                <div className="text-wrapper-2">Google</div>
              </div>
            </div>
            <img className="line" alt="Line" src="/img/line-7-2.svg" />
            <div className="text-wrapper-11">or</div>
            <div className="group-9">
              <div className="group-5">
                <div className="text-wrapper-4">Facebook</div>
                <Facebook className="design-component-instance-node" facebook="/img/facebook-2.svg" />
              </div>
            </div>
            <div className="group-10">
              <div className="group-7">
                <div className="text-wrapper-5">Instagram</div>
                <Instagram className="design-component-instance-node" instagram="/img/instagram-2.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-wrapper-12">Skip</div>
      </div>
    </div>
  );
};
