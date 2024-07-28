var cubits = 0;
var qubits = 0;
var qubitCost = 10;
var kubits = 0;
var kubitCost = 10;
var unstableCubits = -1;
var unstableCubitCap = 10;
var unstableUpgrade1Cost = 10;
var unstableUpgrade2Cost = 5;
var unstableUpgrade3Cost = 2;
var unstableUpgrade4Cost = 4;
var temporalUnlocked = false;
var unstableCubitGain = 1;
var cubitMulti = 1;
var qubitMulti = 1;
var tempQubits = 0;
var tempQubitCost1 = 1000;
var tempQubitCost2 = 1000;
var nextTempQubits = 0;
var genRate = 1000;
var tempUpgrade1Cost = 1;
var cubitEL = false;
var qubitEL = false;
var universalUnlocked = false;
var univKubits = 0;
var univMiles = 0;
var genRateEL = false;
var autoQubit = false;
var autoKubit = false;
var univMile4 = false;
var destabResets = true;
var tempResets = true;

// run on page load
load();

function cubitAdd(num) {
	cubits = cubits + num;
	document.getElementById("cubits").innerHTML = format(cubits);
}

function qubitAdd(num) {
	qubits += num;
	document.getElementById("qubits").innerHTML = format(qubits);
	qubitCost = Math.floor(10+(qubits+1)**1.25);
	document.getElementById("qubitCost").innerHTML = format(qubitCost);
}

function formQubit() {
	if (cubits >= qubitCost) {
		if (cubitEL == false) cubitAdd(-qubitCost);
		qubitAdd(1);
		document.getElementById("divQubitAmt").style.display = "block";
		document.getElementById("divKubits").style.display = "block";
	}
}

function kubitAdd(num) {
	kubits += num;
	document.getElementById("kubits").innerHTML = format(kubits);
	kubitCost = Math.floor(10+(kubits+1)**1.5);
	document.getElementById("kubitCost").innerHTML = format(kubitCost);
}

function formKubit() {
	if (qubits >= kubitCost) {
		if (qubitEL == false) qubitAdd(-kubitCost);
		kubitAdd(1);
		document.getElementById("divKubitAmt").style.display = "block";
		if (kubits >= 3 && unstableCubits == -1) {
			document.getElementById("divUnstableCubits").style.display = "block";
		}
	}
}

function formUnstableCubit() {
	if (cubits >= 1000 && qubits >= 100 && kubits >= 10) {
		if (destabResets) resetLayer(1);
		unstableCubits = 1;
		document.getElementById("divUnstableCubitButton").style.display = "none";
		document.getElementById("divUnstableCubitAmt").style.display = "block";
		document.getElementById("unstableCubits").innerHTML = format(unstableCubits);
		document.getElementById("unstableCubitCap").innerHTML = format(unstableCubitCap);
		document.getElementById("divUnstableUpgrade1").style.display = "block";
		document.getElementById("divUnstableUpgrade2").style.display = "block";
		document.getElementById("divUnstableUpgrade3").style.display = "block";
		document.getElementById("divUnstableUpgrade4").style.display = "block";
		document.getElementById("divUnstableUpgrade5").style.display = "block";
	}
}

function unstableCubitAdd(num) {
	num = Math.ceil(num);
	unstableCubits += num;
	if (unstableCubits == unstableCubitCap+num) {
		unstableCubits = 0;
	} else if (unstableCubits > unstableCubitCap) {
		unstableCubits = unstableCubitCap;
	}
	document.getElementById("unstableCubits").innerHTML = format(unstableCubits);
}

function unstableUpgrade1() {
	if (unstableCubits >= unstableUpgrade1Cost) {
		unstableCubitAdd(-unstableUpgrade1Cost);
		unstableCubitCap *= 2;
		document.getElementById("unstableCubitCap").innerHTML = format(unstableCubitCap);
		unstableUpgrade1Cost *= 2;
		document.getElementById("unstableUpgrade1Cost").innerHTML = format(unstableUpgrade1Cost);
	}
}

function unstableUpgrade2() {
	if (unstableCubits >= unstableUpgrade2Cost) {
		unstableCubitAdd(-unstableUpgrade2Cost);
		unstableCubitGain *= 1.6;
		unstableUpgrade2Cost = Math.floor(unstableUpgrade2Cost*1.75);
		document.getElementById("unstableUpgrade2Cost").innerHTML = format(unstableUpgrade2Cost);
	}
}

function unstableUpgrade3() {
	if (unstableCubits >= unstableUpgrade3Cost) {
		unstableCubitAdd(-unstableUpgrade3Cost);
		cubitMulti += 0.25;
		unstableUpgrade3Cost = Math.floor(unstableUpgrade3Cost*1.5);
		document.getElementById("unstableUpgrade3Cost").innerHTML = format(unstableUpgrade3Cost);
	}
}

function unstableUpgrade4() {
	if (unstableCubits >= unstableUpgrade4Cost) {
		unstableCubitAdd(-unstableUpgrade4Cost);
		qubitMulti += 0.05;
		unstableUpgrade4Cost = Math.floor(unstableUpgrade4Cost*1.5);
		document.getElementById("unstableUpgrade4Cost").innerHTML = format(unstableUpgrade4Cost);
	}
}

function unlockTemporal() {
	if (unstableCubits >= 1000) {
		unstableCubitAdd(-1000);
		quantumUnlocked = true;
		document.getElementById("divUnstableButton5").style.backgroundColor = "gray";
		document.getElementById("divUnstableButton5").disabled = true;
		document.getElementById("divTempQubits").style.display = "block";
	}
}

function tempQubitAdd(num) {
	num = Math.ceil(num);
	tempQubits += num;
	document.getElementById("tempQubits").innerHTML = format(tempQubits);
}

function formTempQubit() {
	if (qubits >= 1000 && unstableCubits >= 1000) {
		if (tempResets) resetLayer(2);
		tempQubitAdd(nextTempQubits);
		tempQubitCost1 = 1000;
		tempQubitCost2 = 1000;
		nextTempQubits = 0;
		
		document.getElementById("tempQubits").innerHTML = format(tempQubits);
		document.getElementById("tempQubitCost1").innerHTML = format(tempQubitCost1);
		document.getElementById("tempQubitCost2").innerHTML = format(tempQubitCost2);
		document.getElementById("nextTempQubits").innerHTML = format(nextTempQubits);
		
		document.getElementById("divTempQubits").style.display = "block";
		document.getElementById("divTempQubitAmt").style.display = "block";
		document.getElementById("divTempUpgrade1").style.display = "block";
		document.getElementById("divTempUpgrade2").style.display = "block";
		document.getElementById("divTempUpgrade3").style.display = "block";
		document.getElementById("divTempUpgrade4").style.display = "block";
	}
}

function tempUpgrade1() {
	if (tempQubits >= tempUpgrade1Cost) {
		tempQubitAdd(-tempUpgrade1Cost);
		genRate = genRate/2;
		// document.getElementById("genRate").innerHTML = format(genRate/1000);
		tempUpgrade1Cost = Math.ceil(tempUpgrade1Cost*1.45);
		document.getElementById("tempUpgrade1Cost").innerHTML = format(tempUpgrade1Cost);
	}
}

function tempUpgrade2() {
	if (tempQubits >= 3) {
		tempQubitAdd(-3);
		cubitEL = true;
		document.getElementById("divTempUpgrade2").style.display = "none";
	}
}

function tempUpgrade3() {
	if (tempQubits >= 5) {
		tempQubitAdd(-5);
		qubitEL = true;
		document.getElementById("divTempUpgrade3").style.display = "none";
	}
}

function unlockUniversal() {
	if (tempQubits >= 10) {
		tempQubitAdd(-10);
		univUnlocked = true;
		document.getElementById("divTempUpgrade4").style.display = "none";
		document.getElementById("divUnivKubits").style.display = "block";
	}
}

const univMileCosts = [1, 2, 3, 4, 7, 10, 15];

function univKubitAdd(num) {
	num = Math.ceil(num);
	univKubits += num;
	document.getElementById("tempQubits").innerHTML = format(tempQubits);
	if (univMileCosts.includes(univKubits)) getUnivMile(univMileCosts.indexOf(univKubits)+1);
}

function formUnivKubit() {
	if (true) {
		univKubitAdd(1);
		resetLayer(3);
	}
}

function getUnivMile(index) {
	if (index == 1) genRateEL = true;
	if (index == 2) {
		cubitMulti *= 2;
		qubitMulti *= 2;
	}
	if (index == 3) {
		cubitMulti *= 2;
		qubitMulti *= 2;
		autoQubit = true;
		autoKubit = true;
	}
	if (index == 4) {
		cubitMulti *= 2;
		qubitMulti *= 2;
		univMile4 = true;
	}
	if (index == 5) {
		cubitMulti *= 2;
		qubitMulti *= 2;
		destabResets = false;
	}
	if (index == 6) {
		cubitMulti *= 2;
		qubitMulti *= 2;
		tempResets = false;
	}
	if (index == 7) {
		cubitMulti *= 2;
		qubitMulti *= 2;
	}
}

/* stages:
	1: unstable cubits
	2: temporal qubits
	3: universal kubits
	4: ascended cubits
	5: dimensional qubits
	6: omniversal kubits
*/

// resets all data before stage point
function resetLayer(stage) {
	if (stage >= 1) {
		kubitAdd(-kubits);
		kubitCost = 10;
		document.getElementById("divKubitAmt").style.display = "none";
		document.getElementById("divKubits").style.display = "none";
		qubitAdd(-qubits);
		document.getElementById("divQubitAmt").style.display = "none";
		qubitCost = 10;
		document.getElementById("qubitCost").innerHTML = format(qubitCost);
		cubitAdd(-cubits);
	}
	if (stage >= 2) {
		unstableCubits = -1;
		unstableUpgrade1Cost = 10;
		unstableUpgrade2Cost = 5;
		unstableUpgrade3Cost = 2;
		unstableUpgrade4Cost = 4;
		cubitMulti = 1;
		qubitMulti = 1;
		document.getElementById("divUnstableCubits").style.display = "none";
		document.getElementById("divUnstableCubitButton").style.display = "block";
		document.getElementById("divUnstableCubitAmt").style.display = "none";
		document.getElementById("divUnstableUpgrade1").style.display = "none";
		document.getElementById("divUnstableUpgrade2").style.display = "none";
		document.getElementById("divUnstableUpgrade3").style.display = "none";
		document.getElementById("divUnstableUpgrade4").style.display = "none";
		document.getElementById("divUnstableUpgrade5").style.display = "none";
	}
	if (stage >= 3) {
		tempQubits = 0;
		tempQubitCost1 = 1000;
		tempQubitCost2 = 1000;
		nextTempQubits = 0;
		if (genRateEL == false) genRate = 1000;
		tempUpgrade1Cost = 1;
		if (univMile4 == false) {	
			cubitEL = false;
			qubitEL = false;
		}
		document.getElementById("divTempQubits").style.display = "none";
		document.getElementById("divTempQubitButton").style.display = "block";
		document.getElementById("divTempQubitAmt").style.display = "none";
		document.getElementById("divTempUpgrade1").style.display = "none";
		document.getElementById("divTempUpgrade2").style.display = "none";
		document.getElementById("divTempUpgrade3").style.display = "none";
		document.getElementById("divTempUpgrade4").style.display = "none";
	}
	if (stage >= 4) {
		
	}
	if (stage >= 5) {
		
	}
	if (stage >= 6) {
		
	}
}

function save() {
	var save = {
		cubits: cubits,
		qubits: qubits,
		qubitCost: qubitCost,
		kubits: kubits,
		kubitCost: kubitCost,
		unstableCubits: unstableCubits,
		unstableCubitCap: unstableCubitCap,
		unstableUpgrade1Cost: unstableUpgrade1Cost,
		unstableUpgrade2Cost: unstableUpgrade2Cost,
		unstableUpgrade3Cost: unstableUpgrade3Cost,
		unstableUpgrade4Cost: unstableUpgrade4Cost,
		temporalUnlocked: temporalUnlocked,
		unstableCubitGain: unstableCubitGain,
		cubitMulti: cubitMulti,
		qubitMulti: qubitMulti,
		tempQubits: tempQubits,
		tempQubitCost1: tempQubitCost1,
		tempQubitCost2: tempQubitCost2,
		nextTempQubits: nextTempQubits
	}
	localStorage.setItem("save",JSON.stringify(save));
}

// autosave every 5 seconds
window.setInterval(function(){
	save();
}, 30000);

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (savegame !== null) {
		if (typeof savegame.cubits !== "undefined") {
			cubits = savegame.cubits;
			document.getElementById("cubits").innerHTML = format(cubits);
		}
		if (typeof savegame.qubits !== "undefined") {
			qubits = savegame.qubits;
			document.getElementById("qubits").innerHTML = format(qubits);
		}
		if (typeof savegame.qubitCost !== "undefined") {
			qubitCost = savegame.qubitCost;
			document.getElementById("qubitCost").innerHTML = format(qubitCost);
			if (qubits > 0) {
				document.getElementById("divQubitAmt").style.display = "block";
				document.getElementById("divKubits").style.display = "block";
			}
		}
		if (typeof savegame.kubits !== "undefined") {
			kubits = savegame.kubits;
			document.getElementById("kubits").innerHTML = format(kubits);
		}
		if (typeof savegame.kubitCost !== "undefined") {
			kubitCost = savegame.kubitCost;
			document.getElementById("kubitCost").innerHTML = format(kubitCost);
			if (kubits > 0) {
				document.getElementById("divKubitAmt").style.display = "block";
			}
		}
		if (typeof savegame.unstableCubits !== "undefined") {
			unstableCubits = savegame.unstableCubits;
			if (unstableCubits >= 0) {
				document.getElementById("divUnstableCubits").style.display = "block";
				document.getElementById("divUnstableCubitButton").style.display = "none";
				document.getElementById("divUnstableCubitAmt").style.display = "block";
				document.getElementById("divUnstableUpgrade1").style.display = "block";
				document.getElementById("divUnstableUpgrade2").style.display = "block";
				document.getElementById("divUnstableUpgrade3").style.display = "block";
				document.getElementById("divUnstableUpgrade4").style.display = "block";
				document.getElementById("divUnstableUpgrade5").style.display = "block";
				document.getElementById("unstableCubits").innerHTML = format(unstableCubits);
			} else if (kubits >= 3) {
				document.getElementById("divUnstableCubits").style.display = "block";
			}
		}
		if (typeof savegame.unstableCubitCap !== "undefined") {
			unstableCubitCap = savegame.unstableCubitCap;
			document.getElementById("unstableCubitCap").innerHTML = format(unstableCubitCap);
		}
		if (typeof savegame.unstableUpgrade1Cost !== "undefined") {
			unstableUpgrade1Cost = savegame.unstableUpgrade1Cost;
			document.getElementById("unstableUpgrade1Cost").innerHTML = format(unstableUpgrade1Cost);
		}
		if (typeof savegame.unstableUpgrade2Cost !== "undefined") {
			unstableUpgrade2Cost = savegame.unstableUpgrade2Cost;
			document.getElementById("unstableUpgrade2Cost").innerHTML = format(unstableUpgrade2Cost);
		}
		if (typeof savegame.unstableUpgrade3Cost !== "undefined") {
			unstableUpgrade3Cost = savegame.unstableUpgrade3Cost;
			document.getElementById("unstableUpgrade3Cost").innerHTML = format(unstableUpgrade3Cost);
		}
		if (typeof savegame.unstableUpgrade4Cost !== "undefined") {
			unstableUpgrade4Cost = savegame.unstableUpgrade4Cost;
			document.getElementById("unstableUpgrade4Cost").innerHTML = format(unstableUpgrade4Cost);
		}
		if (typeof savegame.temporalUnlocked !== "undefined") {
			quantumUnlocked = savegame.quantumUnlocked;
			if (temporalUnlocked) {
				document.getElementById("divUnstableUpgrade5").style.display = "none";
				document.getElementById("divTempQubits").style.display = "block";
			}
		}
		if (typeof savegame.unstableCubitGain !== "undefined") {
			unstableCubitGain = savegame.unstableCubitGain;
		}
		if (typeof savegame.cubitMulti !== "undefined") {
			cubitMulti = savegame.cubitMulti;
		}
		if (typeof savegame.qubitMulti !== "undefined") {
			qubitMulti = savegame.qubitMulti;
		}
		
		if (typeof savegame.tempQubits !== "undefined") {
			tempQubits = savegame.tempQubits;
			if (tempQubits > 0) {
				document.getElementById("divTempQubits").style.display = "block";
				document.getElementById("divTempQubitAmt").style.display = "block";
				document.getElementById("divTempUpgrade1").style.display = "block";
				document.getElementById("divTempUpgrade2").style.display = "block";
				document.getElementById("divTempUpgrade3").style.display = "block";
				document.getElementById("divTempUpgrade4").style.display = "block";
				document.getElementById("tempQubits").innerHTML = format(tempQubits);
			}
		}
		if (typeof savegame.tempQubitCost1 !== "undefined") {
			tempQubitCost1 = savegame.tempQubitCost1;
			document.getElementById("tempQubitCost1").innerHTML = format(tempQubitCost1);
		}
		if (typeof savegame.tempQubitCost2 !== "undefined") {
			tempQubitCost2 = savegame.tempQubitCost2;
			document.getElementById("tempQubitCost2").innerHTML = format(tempQubitCost2);
		}
		if (typeof savegame.nextTempQubits !== "undefined") {
			nextTempQubits = savegame.nextTempQubits;
			document.getElementById("nextTempQubits").innerHTML = format(nextTempQubits);
		}
	}
}

function eraseData() {
	document.getElementById("divEraseData").style.display = "block";
}

function eraseDataYes() {
	localStorage.removeItem("save");
	location.reload();
}

function eraseDataNo() {
	document.getElementById("divEraseData").style.display = "none";
}

function format(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function setUnstableCubits(num) {
	unstableCubitCap = num*10;
	document.getElementById("unstableCubitCap").innerHTML = format(unstableCubitCap);
	unstableCubits = num;
	document.getElementById("unstableCubits").innerHTML = format(unstableCubits);
}

function getCubits() {
	return cubits;
}

function getQubits() {
	return qubits;
}

function getKubits() {
	return kubits;
}

function getUnstableCubits() {
	return unstableCubits;
}

function getTempQubits() {
	return tempQubits;
}

function getUnivKubits() {
	return univKubits;
}

function gen() {
	if (qubits > 0) cubitAdd(Math.ceil(qubits*cubitMulti));
	if (kubits > 0) qubitAdd(Math.ceil(kubits*qubitMulti));
	if (unstableCubits >= 0) unstableCubitAdd(unstableCubitGain);
	window.setTimeout(gen, genRate);
}
window.setTimeout(gen, genRate);

window.setInterval(function(){
	if (qubits >= 0 && unstableCubits >= 0) {
		nextTempQubits = Math.floor(Math.min(Math.log(qubits/1000)/Math.log(5), Math.log(unstableCubits/1000)/Math.log(10)))+1;
		if (nextTempQubits < 0) nextTempQubits = 0;
		document.getElementById("nextTempQubits").innerHTML = format(nextTempQubits);
		if (qubits >= tempQubitCost1 && unstableCubits >= tempQubitCost2) {
			tempQubitCost1 = 1000*Math.pow(5, Math.floor(Math.log(qubits/1000)/Math.log(5))+1);
			// how to make this better bruh
			if (tempQubitCost1 < 1000) tempQubitCost1 = 1000;
			tempQubitCost2 = 1000*Math.pow(10, Math.floor(Math.log(unstableCubits/1000)/Math.log(10))+1);
			// pain and suffering
			if (tempQubitCost2 < 1000) tempQubitCost2 = 1000;
			document.getElementById("tempQubitCost1").innerHTML = format(tempQubitCost1);
			document.getElementById("tempQubitCost2").innerHTML = format(tempQubitCost2);
		}
	}
}, 1);