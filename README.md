# JSGantt
fork of JSGantt from Shlomy Gantz and Brian Twidt, this is meant to maintain the project, since it's no longer being updated.

http://jsgantt.com/

* Copyright (c) 2008, Shlomy Gantz/BlueBrick Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of Shlomy Gantz or BlueBrick Inc. nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY SHLOMY GANTZ/BLUEBRICK INC. ''AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL SHLOMY GANTZ/BLUEBRICK INC. BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

# Changes so far

## Task (new parameter pActionLink)
```
pID: (required) is a unique ID used to identify each row for parent functions and for setting dom id for hiding/showing
pName: (required) is the task Label
pStart: (required) the task start date, can enter empty date ('') for groups. You can also enter specific time (2/10/2008 12:00) for additional percision or half days.
pEnd: (required) the task end date, can enter empty date ('') for groups
pColor: (required) the html color for this task; e.g. '00ff00'
pLink: (optional) any http link navigated to when task bar is clicked.
pMile:(optional) represent a milestone
pRes: (optional) resource name
pComp: (required) completion percent
pGroup: (optional) indicates whether this is a group(parent) - 0=NOT Parent; 1=IS Parent
pParent: (required) identifies a parent pID, this causes this task to be a child of identified task
pOpen: can be initially set to close folder when chart is first drawn
pDepend: optional list of id's this task is dependent on ... line drawn from dependent to this item
pCaption: optional caption that will be added after task bar if CaptionType set to "Caption"

pActionLink optional //new, if value is 1 you can send any JS function to be executed onclick via pLink
```
*You should be able to add items to the chart in realtime via javascript and issuing "g.Draw()" command.
## Added support for multiple languages via jsgantt.lang.js
 just add your language on the file
 ```
 var vLang = {
		"es":{
			time : {hour:"Hora",hours:"Horas",minute:"Minuto",minutes:"Minutos",day:"Día",days:"Días"},
			months : new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"),
			tableHead : {resource:"Recurso",duration:"Duración",comp:"% Comp.",sDate:"Fecha Inicio",eDate:"Fecha Fin"}
		},
		"en":{
			time : {hour:"Hour",hours:"Hours",minute:"Minute",minutes:"Minutes",day:"Day",days:"Days"},
			months : new Array("January","February","March","April","May","June","July","August","September","October","November","December"),
			tableHead : {resource:"Resource",duration:"Duration",comp:"% Comp.",sDate:"Start Date",eDate:"End Date"}
		}
	};
```
by default it starts in English, to change simply add the language variable at the end of the initialization of the chart
	
	var g = new JSGantt.GanttChart('g',document.getElementById('GanttChartDIV'), 'day','es');	
	

## Added support for parsing JSON tasks using parseJSON()

structure of JSON task
```
var task = {
			pID = 0,
			pName = "",
			pStart = "",
			pEnd = "",
			pColor = '0000ff',
			pLink = "",
			pMile = 0,
			pRes = "";,
			pComp = 0;,
			pGroup = 0;,
			pParent = 0;,
			pOpen = 1,
			pDepend = "";,
			pCaption = "",
			pActionLink = 0
		}
```