package com.toy.boardserver.realtimesignweb.guest;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Sign implements Serializable {

    private String name;

    private String phoneNumber;

    private String check1;

    private String check2;

    private String check3;

    private String sign;

    private LocalDateTime createDateTime;

    public Sign() {
    }

    public Sign(String name, String phoneNumber, String check1, String check2, String check3, String sign) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.check1 = check1;
        this.check2 = check2;
        this.check3 = check3;
        this.sign = sign;
        this.createDateTime = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Sign{" +
                "name='" + name + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", check1='" + check1 + '\'' +
                ", check2='" + check2 + '\'' +
                ", check3='" + check3 + '\'' +
                ", sign='" + sign + '\'' +
                ", createDateTime=" + createDateTime +
                '}';
    }
}
