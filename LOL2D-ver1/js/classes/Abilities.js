class Ability {
    constructor(_owner, _data) {
        this.owner = _owner; // player tạo ra chiêu này
        this.damage = _data.damage; // sát thương gây ra
        this.cooldownTime = _data.cooldownTime; // thời gian hồi chiêu (tính bằng milli giây)
        this.range = _data.range; // tầm sử dụng chiêu

        this.radius = _data.radius; // độ lớn chiêu (collide dùng độ lớn này để check va chạm)
        this.speed = _data.speed; // tốc độ di chuyển của chiêu

        this.lastActivatedTime = millis(); // mốc thời gian dùng chiêu trước đó

        if(urfMode) {
            this.cooldownTime -= urfValue * this.cooldownTime;
        }
    }

    available() {
        return (millis() - this.lastActivatedTime >= this.cooldownTime);
    }

    active() { // active này dùng cho những chiêu thức thêm vật thể Movevable vào game
        if (this.available()) {
            this.lastActivatedTime = millis();
            objects.push(this.getMovevableObj());
        }
    }

    showRange() { // tương tự active() => dùng cho những chiêu tạo ra vật thể Moveable
        // chuyển tọa độ chuột về đúng vị trí theo viewport
        let convertedMouse = viewport.convert(mouseX, mouseY);
        let direc = createVector(convertedMouse.x - this.owner.position.x, convertedMouse.y - this.owner.position.y);
        direc.setMag(this.range);
        direc.add(this.owner.position);

        stroke("#9995");
        strokeWeight(this.radius * 2);
        line(this.owner.position.x, this.owner.position.y, direc.x, direc.y);
    }

    getData() {
        return {
            position: this.owner.getPosition(),
            direction: this.owner.getDirectionMouse_Vector(),
            damage: this.damage,
            range: this.range,
            radius: this.radius,
            speed: this.speed
        };
    }

    getMovevableObj() {
    	// mỗi class con khác nhau sẽ có cách xử lý khác nhau 
    }
}

// =======================================================================

class Q_Yasuo extends Ability {
    constructor(_owner) {
        let data = {
            damage: 0,
            cooldownTime: 1000,
            range: 1500,
            radius: 32,
            speed: 21
        }
        super(_owner, data);
    }

    getMovevableObj() {
        return new BaoKiem_Yasuo(this.owner, this.getData());
    }
}

class W_Jinx extends Ability {
    constructor(_owner) {
        let data = {
            damage: 10,
            cooldownTime: 1500,
            range: 1200,
            radius: 17,
            speed: 22
        }
        super(_owner, data);
    }

    getMovevableObj() {
        return new SungDien_Jinx(this.owner, this.getData());
    }
}

class R_Jinx extends Ability {
    constructor(_owner) {
        let data = {
            damage: 0,
            cooldownTime: 2000,
            range: 6000,
            radius: 48,
            speed: 29
        }
        super(_owner, data);
    }

    getMovevableObj() {
        return new BoomSieuKhungKhiep_Jinx(this.owner, this.getData());
    }
}

class Q_Lux extends Ability {
    constructor(_owner) {
        let data = {
            damage: 15,
            cooldownTime: 1000,
            range: 1200,
            radius: 27,
            speed: 25
        }
        super(_owner, data);
    }

    getMovevableObj() {
        return new TroiAnhSanh_Lux(this.owner, this.getData());
    }
}

class Q_Blit extends Ability {
    constructor(_owner) {
        let data = {
            damage: 7,
            cooldownTime: 1200,
            range: 1234,
            radius: 25,
            speed: 26
        }
        super(_owner, data);
    }

    getMovevableObj() {
        return new BanTayHoaTien_Blit(this.owner, this.getData());
    }
}
