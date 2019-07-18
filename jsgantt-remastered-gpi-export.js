var vLang = {"es":{&ENDOFLINE&
	time : {hour:"Hora",hours:"Horas",minute:"Minuto",minutes:"Minutos",day:"Día",days:"Días"},&ENDOFLINE&
	months : new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"),&ENDOFLINE&
	tableHead : {resource:"Recurso",duration:"Duración",comp:"% Comp.",sDate:"Fecha Inicio",eDate:"Fecha Fin"}&ENDOFLINE&
	},&ENDOFLINE&
	"en":{&ENDOFLINE&
		time : {hour:"Hour",hours:"Hours",minute:"Minute",minutes:"Minutes",day:"Day",days:"Days"},&ENDOFLINE&
		months : new Array("January","February","March","April","May","June","July","August","September","October","November","December"),&ENDOFLINE&
		tableHead : {resource:"Resource",duration:"Duration",comp:"% Comp.",sDate:"Start Date",eDate:"End Date"}&ENDOFLINE&
	}&ENDOFLINE&
};&ENDOFLINE&
var JSGantt; if (!JSGantt) JSGantt = {}&ENDOFLINE&;
var vTimeout = 0;&ENDOFLINE&
var vBenchTime = new Date().getTime();&ENDOFLINE&
JSGantt.isIE = function () {
	if(typeof document.all != 'undefined')
		return true;
	else
		return false;
}&ENDOFLINE&
var vSelectedLang;
JSGantt.TaskItem = function(pID, pName, pStart, pEnd, pColor, pLink, pMile, pRes, pComp, pGroup, pParent, pOpen, pDepend, pCaption,pActionLink)
{
      var vID    = pID;
      var vName  = pName;
      var vStart = new Date();&ENDOFLINE&	
      var vEnd   = new Date();&ENDOFLINE&
      var vColor = pColor;
      var vLink  = pLink;
      var vLinkIsAction = pActionLink;
      var vMile  = pMile;
      var vRes   = pRes;
      var vComp  = pComp;
      var vGroup = pGroup;
      var vParent = pParent;
      var vOpen   = pOpen;
      var vDepend = pDepend;
      var vCaption = pCaption;
      var vDuration = '';
      var vLevel = 0;&ENDOFLINE&
      var vNumKid = 0;&ENDOFLINE&
      var vVisible  = 1;
      var x1, y1, x2, y2;
      if (vGroup != 1)
      {  
         vStart = JSGantt.parseDateStr(pStart,g.getDateInputFormat());
         vEnd   = JSGantt.parseDateStr(pEnd,g.getDateInputFormat());
      }&ENDOFLINE&
      this.getID       = function(){ return vID }&ENDOFLINE&;
      this.getName     = function(){ return vName }&ENDOFLINE&;
      this.getStart    = function(){ return vStart}&ENDOFLINE&;
      this.getEnd      = function(){ return vEnd  }&ENDOFLINE&;
      this.getColor    = function(){ return vColor}&ENDOFLINE&;
      this.getLink     = function(){ return vLink }&ENDOFLINE&;
      this.getLinkIsAction     = function(){ return vLinkIsAction }&ENDOFLINE&;
      this.getMile     = function(){ return vMile }&ENDOFLINE&;
      this.getDepend   = function(){ if(vDepend) return vDepend; else return null }&ENDOFLINE&;
      this.getCaption  = function(){ if(vCaption) return vCaption; else return ''; }&ENDOFLINE&;
      this.getResource = function(){ if(vRes) return vRes; else return '&nbsp';  }&ENDOFLINE&;
      this.getCompVal  = function(){ if(vComp) return vComp; else return 0;&ENDOFLINE& }&ENDOFLINE&;
      this.getCompStr  = function(){ if(vComp) return vComp+'%'; else return ''; }&ENDOFLINE&;
      this.getDuration = function(vFormat){ 
         if (vMile) 
            vDuration = '-';
            else if (vFormat=='hour')
            {
                tmpPer =  Math.ceil((this.getEnd() - this.getStart()) /  ( 60 * 60 * 1000) );
                if(tmpPer == 1)  
                    vDuration = '1 '+vSelectedLang.time.hour;
                else
                    vDuration = tmpPer + +vSelectedLang.time.hours;
            }&ENDOFLINE&
            else if (vFormat=='minute')
            {
                tmpPer =  Math.ceil((this.getEnd() - this.getStart()) /  ( 60 * 1000) );
                if(tmpPer == 1)  
                    vDuration = '1 '+vSelectedLang.time.minute;
                else
                    vDuration = tmpPer + vSelectedLang.time.minutes;
            }&ENDOFLINE&
 		   else { 
            tmpPer =  Math.ceil((this.getEnd() - this.getStart()) /  (24 * 60 * 60 * 1000) + 1);
            if(tmpPer == 1)  vDuration = '1 '+vSelectedLang.time.day;
            else             vDuration = tmpPer +vSelectedLang.time.days;
         }&ENDOFLINE&
         return( vDuration )
      }&ENDOFLINE&;
      this.getParent   = function(){ return vParent }&ENDOFLINE&;
      this.getGroup    = function(){ return vGroup }&ENDOFLINE&;
      this.getOpen     = function(){ return vOpen }&ENDOFLINE&;
      this.getLevel    = function(){ return vLevel }&ENDOFLINE&;
      this.getNumKids  = function(){ return vNumKid }&ENDOFLINE&;
      this.getStartX   = function(){ return x1 }&ENDOFLINE&;
      this.getStartY   = function(){ return y1 }&ENDOFLINE&;
      this.getEndX     = function(){ return x2 }&ENDOFLINE&;
      this.getEndY     = function(){ return y2 }&ENDOFLINE&;
      this.getVisible  = function(){ return vVisible }&ENDOFLINE&;
	  this.setDepend   = function(pDepend){ vDepend = pDepend;}&ENDOFLINE&;
      this.setStart    = function(pStart){ vStart = pStart;}&ENDOFLINE&;
      this.setEnd      = function(pEnd)  { vEnd   = pEnd;  }&ENDOFLINE&;
      this.setLevel    = function(pLevel){ vLevel = pLevel;}&ENDOFLINE&;
      this.setNumKid   = function(pNumKid){ vNumKid = pNumKid;}&ENDOFLINE&;
      this.setCompVal  = function(pCompVal){ vComp = pCompVal;}&ENDOFLINE&;
      this.setStartX   = function(pX) {x1 = pX; }&ENDOFLINE&;
      this.setStartY   = function(pY) {y1 = pY; }&ENDOFLINE&;
      this.setEndX     = function(pX) {x2 = pX; }&ENDOFLINE&;
      this.setEndY     = function(pY) {y2 = pY; }&ENDOFLINE&;
      this.setOpen     = function(pOpen) {vOpen = pOpen; }&ENDOFLINE&;
      this.setVisible  = function(pVisible) {vVisible = pVisible; }&ENDOFLINE&;
  }&ENDOFLINE&
JSGantt.GanttChart =  function(pGanttVar, pDiv, pFormat,pLang)
{
	vSelectedLang = (pLang && pLang != "") ? vLang[pLang] : vLang["en"] ;
      var vGanttVar = pGanttVar;
      var vDiv      = pDiv;
      var vFormat   = pFormat;
      var vShowRes  = 1;
      var vShowDur  = 1;
      var vShowComp = 1;
      var vShowLastRow = 1;
      var vShowStartDate = 1;
      var vShowEndDate = 1;
      var vDateInputFormat = "yyyy/mm/dd";&ENDOFLINE&
      var vDateDisplayFormat = "mm/dd/yy";&ENDOFLINE&&ENDOFLINE&
	  var vNumUnits  = 0;&ENDOFLINE&
      var vCaptionType;
      var vDepId = 1;
      var vTaskList     = new Array();&ENDOFLINE&	
	  var vFormatArr	= new Array("day","week","month","quarter");
      var vQuarterArr   = new Array(1,1,1,2,2,2,3,3,3,4,4,4);
      var vMonthDaysArr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
      var vMonthArr     = vSelectedLang.months;
	  this.setFormatArr = function() 	 {
										  vFormatArr = new Array();&ENDOFLINE&&ENDOFLINE&
										  for(var i = 0;&ENDOFLINE& i < arguments.length; i++) {vFormatArr[i] = arguments[i];}&ENDOFLINE&
										  if(vFormatArr.length>4){vFormatArr.length=4;}&ENDOFLINE&
										 }&ENDOFLINE&;
      this.setShowRes  = function(pShow) { vShowRes  = pShow; }&ENDOFLINE&;
      this.setShowDur  = function(pShow) { vShowDur  = pShow; }&ENDOFLINE&;
      this.setShowComp = function(pShow) { vShowComp = pShow; }&ENDOFLINE&;
      this.setShowStartDate = function(pShow) { vShowStartDate = pShow; }&ENDOFLINE&;
      this.setShowEndDate = function(pShow) { vShowEndDate = pShow; }&ENDOFLINE&;
      this.setDateInputFormat = function(pShow) { vDateInputFormat = pShow; }&ENDOFLINE&;
      this.setDateDisplayFormat = function(pShow) { vDateDisplayFormat = pShow; }&ENDOFLINE&;
      this.setShowLastRow = function(pShow) { vShowLastRow = pShow; }&ENDOFLINE&;
      this.setCaptionType = function(pType) { vCaptionType = pType }&ENDOFLINE&;
      this.setFormat = function(pFormat){ 
         vFormat = pFormat; 
         this.Draw();&ENDOFLINE& 
      }&ENDOFLINE&;
      this.getShowRes  = function(){ return vShowRes }&ENDOFLINE&;
      this.getShowDur  = function(){ return vShowDur }&ENDOFLINE&;
      this.getShowComp = function(){ return vShowComp }&ENDOFLINE&;
	   this.getShowStartDate = function(){ return vShowStartDate }&ENDOFLINE&;
	   this.getShowEndDate = function(){ return vShowEndDate }&ENDOFLINE&;
      this.getDateInputFormat = function() { return vDateInputFormat }&ENDOFLINE&;
      this.getDateDisplayFormat = function() { return vDateDisplayFormat }&ENDOFLINE&;
      this.getCaptionType = function() { return vCaptionType }&ENDOFLINE&;
      this.CalcTaskXY = function () 
      {
         var vList = this.getList();&ENDOFLINE&
         var vTaskDiv;
         var vParDiv;
         var vLeft, vTop, vHeight, vWidth;
         for(i = 0;&ENDOFLINE& i < vList.length; i++)
         {
            vID = vList[i].getID();&ENDOFLINE&
            vTaskDiv = document.getElementById("taskbar_"+vID);
            vBarDiv  = document.getElementById("bardiv_"+vID);
            vParDiv  = document.getElementById("childgrid_"+vID);
            if(vBarDiv) {
               vList[i].setStartX( vBarDiv.offsetLeft );&ENDOFLINE&
               vList[i].setStartY( vParDiv.offsetTop+vBarDiv.offsetTop+6 );&ENDOFLINE&
               vList[i].setEndX( vBarDiv.offsetLeft + vBarDiv.offsetWidth );&ENDOFLINE&
               vList[i].setEndY( vParDiv.offsetTop+vBarDiv.offsetTop+6 );&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
      }&ENDOFLINE&
      this.AddTaskItem = function(value)
      {
         vTaskList.push(value);
      }&ENDOFLINE&
      this.getList   = function() { return vTaskList }&ENDOFLINE&;
      this.clearDependencies = function()
      {
         var parent = document.getElementById('rightside');
         var depLine;
         var vMaxId = vDepId;
         for ( i=1; i<vMaxId; i++ ) {
            depLine = document.getElementById("line"+i);
            if (depLine) { parent.removeChild(depLine); }&ENDOFLINE&
         }&ENDOFLINE&
         vDepId = 1;
      }&ENDOFLINE&
      this.sLine = function(x1,y1,x2,y2) {
         vLeft = Math.min(x1,x2);
         vTop  = Math.min(y1,y2);
         vWid  = Math.abs(x2-x1) + 1;
         vHgt  = Math.abs(y2-y1) + 1;
         vDoc = document.getElementById('rightside');
	 var oDiv = document.createElement('div');&ENDOFLINE&
	 oDiv.id = "line"+vDepId++;
         oDiv.style.position = "absolute";&ENDOFLINE&
	 oDiv.style.margin = "0px";&ENDOFLINE&
	 oDiv.style.padding = "0px";&ENDOFLINE&
	 oDiv.style.overflow = "hidden";&ENDOFLINE&
	 oDiv.style.border = "0px";&ENDOFLINE&
	 oDiv.style.zIndex = 0;&ENDOFLINE&
	 oDiv.style.backgroundColor = "red";&ENDOFLINE&
	 oDiv.style.left = vLeft + "px";&ENDOFLINE&&ENDOFLINE&
	 oDiv.style.top = vTop + "px";&ENDOFLINE&
	 oDiv.style.width = vWid + "px";&ENDOFLINE&
	 oDiv.style.height = vHgt + "px";&ENDOFLINE&
	 oDiv.style.visibility = "visible";&ENDOFLINE&
	 vDoc.appendChild(oDiv);
      }&ENDOFLINE&
      this.dLine = function(x1,y1,x2,y2) {
         var dx = x2 - x1;
         var dy = y2 - y1;
         var x = x1;
         var y = y1;
         var n = Math.max(Math.abs(dx),Math.abs(dy));
         dx = dx / n;
         dy = dy / n;
         for ( i = 0;&ENDOFLINE& i <= n; i++ )
         {
            vx = Math.round(x); 
            vy = Math.round(y);
            this.sLine(vx,vy,vx,vy);
            x += dx;
            y += dy;
         }&ENDOFLINE&
      }&ENDOFLINE&
      this.drawDependency =function(x1,y1,x2,y2)
      {
         if(x1 + 10 < x2)
         { 
            this.sLine(x1,y1,x1+4,y1);
            this.sLine(x1+4,y1,x1+4,y2);
            this.sLine(x1+4,y2,x2,y2);
            this.dLine(x2,y2,x2-3,y2-3);
            this.dLine(x2,y2,x2-3,y2+3);
            this.dLine(x2-1,y2,x2-3,y2-2);
            this.dLine(x2-1,y2,x2-3,y2+2);
         }&ENDOFLINE&
         else
         {
            this.sLine(x1,y1,x1+4,y1);
            this.sLine(x1+4,y1,x1+4,y2-10);
            this.sLine(x1+4,y2-10,x2-8,y2-10);
            this.sLine(x2-8,y2-10,x2-8,y2);
            this.sLine(x2-8,y2,x2,y2);
            this.dLine(x2,y2,x2-3,y2-3);
            this.dLine(x2,y2,x2-3,y2+3);
            this.dLine(x2-1,y2,x2-3,y2-2);
            this.dLine(x2-1,y2,x2-3,y2+2);
         }&ENDOFLINE&
      }&ENDOFLINE&
      this.DrawDependencies = function () {
         this.CalcTaskXY();&ENDOFLINE&
         this.clearDependencies();&ENDOFLINE&
         var vList = this.getList();&ENDOFLINE&
         for(var i = 0;&ENDOFLINE& i < vList.length; i++)
         {
            vDepend = vList[i].getDepend();&ENDOFLINE&
            if(vDepend) {
               var vDependStr = vDepend + '';
               var vDepList = vDependStr.split(',');
               var n = vDepList.length;
               for(var k=0;&ENDOFLINE&k<n;k++) {
                  var vTask = this.getArrayLocationByID(vDepList[k]);
                  if(vList[vTask].getVisible()==1)
                     this.drawDependency(vList[vTask].getEndX(),vList[vTask].getEndY(),vList[i].getStartX()-1,vList[i].getStartY())
               }&ENDOFLINE&
  	    }&ENDOFLINE&
         }&ENDOFLINE&
      }&ENDOFLINE&
      this.getArrayLocationByID = function(pId)  {
         var vList = this.getList();&ENDOFLINE&
         for(var i = 0;&ENDOFLINE& i < vList.length; i++)
         {
            if(vList[i].getID()==pId)
               return i;
         }&ENDOFLINE&
      }&ENDOFLINE&
   this.Draw = function()
   {
      var vMaxDate = new Date();&ENDOFLINE&
      var vMinDate = new Date();&ENDOFLINE&	
      var vTmpDate = new Date();&ENDOFLINE&
      var vNxtDate = new Date();&ENDOFLINE&
      var vCurrDate = new Date();&ENDOFLINE&
      var vTaskLeft = 0;&ENDOFLINE&
      var vTaskRight = 0;&ENDOFLINE&
      var vNumCols = 0;&ENDOFLINE&
      var vID = 0;&ENDOFLINE&
      var vMainTable = "";&ENDOFLINE&
      var vLeftTable = "";&ENDOFLINE&
      var vRightTable = "";&ENDOFLINE&
      var vDateRowStr = "";&ENDOFLINE&
      var vItemRowStr = "";&ENDOFLINE&
      var vColWidth = 0;&ENDOFLINE&
      var vColUnit = 0;&ENDOFLINE&
      var vChartWidth = 0;&ENDOFLINE&
      var vNumDays = 0;&ENDOFLINE&
      var vDayWidth = 0;&ENDOFLINE&
      var vStr = "";&ENDOFLINE&
      var vNameWidth = 100;&ENDOFLINE&	
      var vStatusWidth = 70;&ENDOFLINE&
      var vLeftWidth = 15 + 220 + 70 + 70 + 70 + 70 + 70;&ENDOFLINE&
      if(vTaskList.length > 0)
      {
         JSGantt.processRows(vTaskList, 0, -1, 1, 1);
         vMinDate = JSGantt.getMinDate(vTaskList, vFormat);
         vMaxDate = JSGantt.getMaxDate(vTaskList, vFormat);
         if(vFormat == 'day') {
            vColWidth = 18;
            vColUnit = 1;
         }&ENDOFLINE&
         else if(vFormat == 'week') {
            vColWidth = 37;
            vColUnit = 7;
         }&ENDOFLINE&
         else if(vFormat == 'month') {
            vColWidth = 37;
            vColUnit = 30;&ENDOFLINE&
         }&ENDOFLINE&
         else if(vFormat == 'quarter') {
            vColWidth = 60;&ENDOFLINE&
            vColUnit = 90;&ENDOFLINE&
         }&ENDOFLINE&
         else if(vFormat=='hour')
         {
            vColWidth = 18;
            vColUnit = 1;
         }&ENDOFLINE&
         else if(vFormat=='minute')
         {
            vColWidth = 18;
            vColUnit = 1;
         }&ENDOFLINE&
         vNumDays = (Date.parse(vMaxDate) - Date.parse(vMinDate)) / ( 24 * 60 * 60 * 1000);&ENDOFLINE&
         vNumUnits = vNumDays / vColUnit;
         vChartWidth = vNumUnits * vColWidth + 1;&ENDOFLINE&
         vDayWidth = (vColWidth / vColUnit) + (1/vColUnit);&ENDOFLINE&
         vMainTable =
            '<TABLE id=theTable cellSpacing=0 cellPadding=0 border=0><TBODY><TR>' +
            '<TD vAlign=top bgColor=#ffffff>';&ENDOFLINE&
         if(vShowRes !=1) vNameWidth+=vStatusWidth;&ENDOFLINE&
         if(vShowDur !=1) vNameWidth+=vStatusWidth;&ENDOFLINE&
         if(vShowComp!=1) vNameWidth+=vStatusWidth;&ENDOFLINE&
		   if(vShowStartDate!=1) vNameWidth+=vStatusWidth;&ENDOFLINE&
		   if(vShowEndDate!=1) vNameWidth+=vStatusWidth;&ENDOFLINE&
         vLeftTable =
            '<DIV class=scroll id=leftside style="width:100%"><TABLE cellSpacing=0 cellPadding=0 border=0><TBODY>' +&ENDOFLINE&
            '<TR style="HEIGHT: 17px">' +&ENDOFLINE&
            '  <TD style="WIDTH: 15px; HEIGHT: 17px"></TD>' +&ENDOFLINE&
            '  <TD style="WIDTH: ' + vNameWidth + 'px; HEIGHT: 17px"><NOBR></NOBR></TD>'; &ENDOFLINE&
         if(vShowRes ==1) vLeftTable += '  <TD style="WIDTH: ' + vStatusWidth + 'px; HEIGHT: 17px"></TD>' ;&ENDOFLINE&
         if(vShowDur ==1) vLeftTable += '  <TD style="WIDTH: ' + vStatusWidth + 'px; HEIGHT: 17px"></TD>' ;&ENDOFLINE&
         if(vShowComp==1) vLeftTable += '  <TD style="WIDTH: ' + vStatusWidth + 'px; HEIGHT: 17px"></TD>' ;&ENDOFLINE&
			if(vShowStartDate==1) vLeftTable += '  <TD style="WIDTH: ' + vStatusWidth + 'px; HEIGHT: 17px"></TD>' ;&ENDOFLINE&
			if(vShowEndDate==1) vLeftTable += '  <TD style="WIDTH: ' + vStatusWidth + 'px; HEIGHT: 17px"></TD>' ;&ENDOFLINE&
         vLeftTable +=
            '<TR style="HEIGHT: 20px">' +&ENDOFLINE&
            '  <TD style="BORDER-TOP: #efefef 1px solid; WIDTH: 15px; HEIGHT: 20px"></TD>' +&ENDOFLINE&
            '  <TD style="BORDER-TOP: #efefef 1px solid; WIDTH: ' + vNameWidth + 'px; HEIGHT: 20px"><NOBR></NOBR></TD>' ;&ENDOFLINE&
         if(vShowRes ==1) vLeftTable += '  <TD style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; WIDTH: 60px; HEIGHT: 20px" align=center nowrap>'+vSelectedLang.tableHead.resource+'</TD>' ;&ENDOFLINE&
         if(vShowDur ==1) vLeftTable += '  <TD style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; WIDTH: 60px; HEIGHT: 20px" align=center nowrap>'+vSelectedLang.tableHead.duration+'</TD>' ;&ENDOFLINE&
         if(vShowComp==1) vLeftTable += '  <TD style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; WIDTH: 60px; HEIGHT: 20px" align=center nowrap>'+vSelectedLang.tableHead.comp+'</TD>' ;&ENDOFLINE&
         if(vShowStartDate==1) vLeftTable += '  <TD style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; WIDTH: 75px; HEIGHT: 20px" align=center nowrap>'+vSelectedLang.tableHead.sDate+'</TD>' ;&ENDOFLINE&
         if(vShowEndDate==1) vLeftTable += '  <TD style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; WIDTH: 75px; HEIGHT: 20px" align=center nowrap>'+vSelectedLang.tableHead.eDate+'</TD>' ;&ENDOFLINE&
         vLeftTable += '</TR>';
            for(i = 0;&ENDOFLINE& i < vTaskList.length; i++)
            {
               if( vTaskList[i].getGroup()) {
                  vBGColor = "f3f3f3";&ENDOFLINE&
                  vRowType = "group";&ENDOFLINE&
               }&ENDOFLINE& else {
                  vBGColor  = "ffffff";&ENDOFLINE&
                  vRowType  = "row";&ENDOFLINE&
               }&ENDOFLINE&
               vID = vTaskList[i].getID();&ENDOFLINE&
  		         if(vTaskList[i].getVisible() == 0) 
                  vLeftTable += '<TR id=child_' + vID + ' bgcolor=#' + vBGColor + ' style="display:none"  onMouseover=g.mouseOver(this,' + vID + ',"left","' + vRowType + '") onMouseout=g.mouseOut(this,' + vID + ',"left","' + vRowType + '")>' ;&ENDOFLINE&
			      else
                 vLeftTable += '<TR id=child_' + vID + ' bgcolor=#' + vBGColor + ' onMouseover=g.mouseOver(this,' + vID + ',"left","' + vRowType + '") onMouseout=g.mouseOut(this,' + vID + ',"left","' + vRowType + '")>' ;&ENDOFLINE&
			      vLeftTable += 
                  '  <TD class=gdatehead style="WIDTH: 15px; HEIGHT: 20px; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;">&nbsp;</TD>' +&ENDOFLINE&
                  '  <TD class=gname style="WIDTH: ' + vNameWidth + 'px; HEIGHT: 20px; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px;" nowrap><NOBR><span style="color: #aaaaaa">';&ENDOFLINE&
               for(j=1; j<vTaskList[i].getLevel();&ENDOFLINE& j++) {&ENDOFLINE&
                  vLeftTable += '&nbsp&nbsp&nbsp&nbsp';
               }&ENDOFLINE&
               vLeftTable += '</span>';&ENDOFLINE&
               if( vTaskList[i].getGroup()) {&ENDOFLINE&
                  if( vTaskList[i].getOpen() == 1) &ENDOFLINE&
                     vLeftTable += '<SPAN id="group_' + vID +&ENDOFLINE& '" style="color:#000000; cursor:pointer; font-weight:bold; FONT-SIZE: 12px;" onclick="JSGantt.folder(' + vID +&ENDOFLINE& ','+vGanttVar+');'+vGanttVar+'.DrawDependencies();">&ndash;</span><span style="color:#000000">&nbsp</SPAN>' ;&ENDOFLINE&
                  else&ENDOFLINE&
                     vLeftTable += '<SPAN id="group_' + vID +&ENDOFLINE& '" style="color:#000000; cursor:pointer; font-weight:bold; FONT-SIZE: 12px;" onclick="JSGantt.folder(' + vID + ','+vGanttVar+&ENDOFLINE&');'+vGanttVar+'.DrawDependencies();">+</span><span style="color:#000000">&nbsp</SPAN>' ;&ENDOFLINE&
               }&ENDOFLINE& else {
                  vLeftTable += '<span style="color: #000000; font-weight:bold; FONT-SIZE: 12px;">&nbsp&nbsp&nbsp</span>';&ENDOFLINE&
               }&ENDOFLINE&
               vLeftTable += 
            	   ((vTaskList[i].getLinkIsAction()==1)?
            		'<span onclick="'+vTaskList[i].getLink()+';" style="cursor:pointer"> ' + vTaskList[i].getName() +&ENDOFLINE& '</span></NOBR></TD>' :
               		'<span onclick=JSGantt.taskLink("' +&ENDOFLINE& vTaskList[i].getLink() + '",300,200); style="cursor:pointer"> ' +&ENDOFLINE& vTaskList[i].getName() + '</span></NOBR></TD>') ;&ENDOFLINE&
               if(vShowRes ==1) vLeftTable +=&ENDOFLINE& '  <TD class=gname style="WIDTH: 60px; HEIGHT: 20px; TEXT-ALIGN: center; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><NOBR>' +&ENDOFLINE& vTaskList[i].getResource() + '</NOBR></TD>' ;&ENDOFLINE&
               if(vShowDur ==1) vLeftTable +=&ENDOFLINE& '  <TD class=gname style="WIDTH: 60px; HEIGHT: 20px; TEXT-ALIGN: center; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><NOBR>' +&ENDOFLINE& vTaskList[i].getDuration(vFormat) + '</NOBR></TD>' ;&ENDOFLINE&
               if(vShowComp==1) vLeftTable +=&ENDOFLINE& '  <TD class=gname style="WIDTH: 60px; HEIGHT: 20px; TEXT-ALIGN: center; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><NOBR>' +&ENDOFLINE& vTaskList[i].getCompStr()  + '</NOBR></TD>' ;&ENDOFLINE&
               if(vShowStartDate==1) vLeftTable +=&ENDOFLINE& '  <TD class=gname style="WIDTH: 60px; HEIGHT: 20px; TEXT-ALIGN: center; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><NOBR>' +&ENDOFLINE& JSGantt.formatDateStr( vTaskList[i].getStart(), vDateDisplayFormat) + '</NOBR></TD>' ;&ENDOFLINE&
               if(vShowEndDate==1) vLeftTable += '  <TD class=gname style="WIDTH: 60px; HEIGHT: 20px; TEXT-ALIGN: center; BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><NOBR>' +&ENDOFLINE& JSGantt.formatDateStr( vTaskList[i].getEnd(), vDateDisplayFormat) + '</NOBR></TD>' ;&ENDOFLINE&
               vLeftTable += '</TR>';&ENDOFLINE&
            }&ENDOFLINE&
            if(vShowLastRow == 1){&ENDOFLINE&
            vLeftTable += '</TD></TR>' +&ENDOFLINE&
              '<TR><TD border=1 colspan=5 align=left style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 11px; BORDER-LEFT: #efefef 1px solid; height=18px">&nbsp;&nbsp;Powered by <a href=http://www.jsgantt.com>jsGantt</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Format:';&ENDOFLINE&
			if (vFormatArr.join().indexOf("minute")!=-1) { &ENDOFLINE&
            if (vFormat=='minute') vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="minute" checked>Minute';&ENDOFLINE&
            else                vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("minute",'+vGanttVar+'); VALUE="minute">Minute';&ENDOFLINE&
			}&ENDOFLINE&
			if (vFormatArr.join().indexOf("hour")!=-1) { &ENDOFLINE&
            if (vFormat=='hour') vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="hour" checked>Hour';&ENDOFLINE&
            else                vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("hour",'+vGanttVar+'); VALUE="hour">Hour';&ENDOFLINE&
			}&ENDOFLINE&
			if (vFormatArr.join().indexOf("day")!=-1) { &ENDOFLINE&
            if (vFormat=='day') vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="day" checked>Day';&ENDOFLINE&
            else                vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("day",'+vGanttVar+'); VALUE="day">Day';&ENDOFLINE&
			}&ENDOFLINE&
			if (vFormatArr.join().indexOf("week")!=-1) { 
            if (vFormat=='week') vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="week" checked>Week';&ENDOFLINE&
            else                vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("week",'+vGanttVar+') VALUE="week">Week';&ENDOFLINE&
			}&ENDOFLINE&
			if (vFormatArr.join().indexOf("month")!=-1) { &ENDOFLINE&
            if (vFormat=='month') vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="month" checked>Month';&ENDOFLINE&
            else                vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("month",'+vGanttVar+') VALUE="month">Month';&ENDOFLINE&
			}&ENDOFLINE&
			if (vFormatArr.join().indexOf("quarter")!=-1) { &ENDOFLINE&
            if (vFormat=='quarter') vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" VALUE="quarter" checked>Quarter';&ENDOFLINE&
            else                vLeftTable += '<INPUT TYPE=RADIO NAME="radFormat" onclick=JSGantt.changeFormat("quarter",'+vGanttVar+') VALUE="quarter">Quarter';&ENDOFLINE&
			}&ENDOFLINE&
			vLeftTable += '</TD></TR>';&ENDOFLINE&
            }&ENDOFLINE&
            vLeftTable += '</TBODY></TABLE></TD>';&ENDOFLINE&
            vMainTable += vLeftTable;&ENDOFLINE&
            vRightTable = 
            '<TD style="width: ' + vChartWidth + 'px;" vAlign=top bgColor=#ffffff>' +&ENDOFLINE&
            '<DIV class=scroll2 id=rightside>' +&ENDOFLINE&
            '<TABLE style="width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +&ENDOFLINE&
            '<TBODY><TR style="HEIGHT: 18px">';
            vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());&ENDOFLINE&
            vTmpDate.setHours(0);&ENDOFLINE&
            vTmpDate.setMinutes(0);&ENDOFLINE&
         while(Date.parse(vTmpDate) <= Date.parse(vMaxDate))&ENDOFLINE&
         {	&ENDOFLINE&
            vStr = vTmpDate.getFullYear() + '';&ENDOFLINE&
            vStr = vStr.substring(2,4);&ENDOFLINE&
            if(vFormat == 'minute')&ENDOFLINE&
            {&ENDOFLINE&
                vRightTable += '<td class=gdatehead style="FONT-SIZE: 12px; HEIGHT: 19px;" align=center colspan=60>' ;&ENDOFLINE&
                vRightTable += JSGantt.formatDateStr(vTmpDate, vDateDisplayFormat) + ' ' + vTmpDate.getHours() + ':00 -' + vTmpDate.getHours() + ':59 </td>';&ENDOFLINE&
                vTmpDate.setHours(vTmpDate.getHours()+1);&ENDOFLINE&
            }&ENDOFLINE&
            if(vFormat == 'hour')&ENDOFLINE&
            {&ENDOFLINE&
                vRightTable += '<td class=gdatehead style="FONT-SIZE: 12px; HEIGHT: 19px;" align=center colspan=24>' ;&ENDOFLINE&
                vRightTable += JSGantt.formatDateStr(vTmpDate, vDateDisplayFormat) + '</td>';&ENDOFLINE&
                vTmpDate.setDate(vTmpDate.getDate()+1);&ENDOFLINE&
            }&ENDOFLINE&
  	         if(vFormat == 'day')&ENDOFLINE&
            {&ENDOFLINE&
			      vRightTable += '<td class=gdatehead style="FONT-SIZE: 12px; HEIGHT: 19px;" align=center colspan=7>' +&ENDOFLINE&
			      JSGantt.formatDateStr(vTmpDate,vDateDisplayFormat.substring(0,5)) + ' - ';&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate()+6);&ENDOFLINE&
		         vRightTable += JSGantt.formatDateStr(vTmpDate, vDateDisplayFormat) + '</td>';&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate()+1);&ENDOFLINE&
            }&ENDOFLINE&
            else if(vFormat == 'week')&ENDOFLINE&
            {&ENDOFLINE&
  		         vRightTable += '<td class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 19px;" width='+vColWidth+'px>`'+ vStr + '</td>';&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate()+7);&ENDOFLINE&
            }&ENDOFLINE&
            else if(vFormat == 'month')&ENDOFLINE&
            {&ENDOFLINE&
	            vRightTable += '<td class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 19px;" width='+vColWidth+'px>`'+ vStr + '</td>';&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate() + 1);&ENDOFLINE&
               while(vTmpDate.getDate() > 1)&ENDOFLINE&
               {&ENDOFLINE&
                 vTmpDate.setDate(vTmpDate.getDate() + 1);&ENDOFLINE&
               }&ENDOFLINE&
            }&ENDOFLINE&
            else if(vFormat == 'quarter')&ENDOFLINE&
            {&ENDOFLINE&
	            vRightTable += '<td class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 19px;" width='+vColWidth+'px>`'+ vStr + '</td>';&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate() + 81);&ENDOFLINE&
               while(vTmpDate.getDate() > 1)&ENDOFLINE&
               {&ENDOFLINE&
                 vTmpDate.setDate(vTmpDate.getDate() + 1);&ENDOFLINE&
               }&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
         vRightTable += '</TR><TR>';&ENDOFLINE&
         vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());&ENDOFLINE&
         vNxtDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());&ENDOFLINE&
         vNumCols = 0;&ENDOFLINE&
         while(Date.parse(vTmpDate) <= Date.parse(vMaxDate))&ENDOFLINE&
         {	
            if (vFormat == 'minute')&ENDOFLINE&
            {&ENDOFLINE&
			  if( vTmpDate.getMinutes() ==0 ) &ENDOFLINE&
                  vWeekdayColor = "ccccff";&ENDOFLINE&
               else
                  vWeekdayColor = "ffffff";&ENDOFLINE&
                vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;"  bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center><div style="width: '+vColWidth+'px">' + vTmpDate.getMinutes() + '</div></td>';&ENDOFLINE&
                vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
                vTmpDate.setMinutes(vTmpDate.getMinutes() + 1);&ENDOFLINE&
            }&ENDOFLINE&
            else if (vFormat == 'hour')&ENDOFLINE&
            {&ENDOFLINE&
			   if(  vTmpDate.getHours() ==0  ) &ENDOFLINE&
                  vWeekdayColor = "ccccff";&ENDOFLINE&
               else&ENDOFLINE&
                  vWeekdayColor = "ffffff";&ENDOFLINE&
                vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;"  bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center><div style="width: '+vColWidth+'px">' + vTmpDate.getHours() + '</div></td>';&ENDOFLINE&
                vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
                vTmpDate.setHours(vTmpDate.getHours() + 1);&ENDOFLINE&
            }&ENDOFLINE&
	        else if(vFormat == 'day' )&ENDOFLINE&
             {&ENDOFLINE&
               if( JSGantt.formatDateStr(vCurrDate,'mm/dd/yyyy') == JSGantt.formatDateStr(vTmpDate,'mm/dd/yyyy')) {&ENDOFLINE&
                  vWeekdayColor  = "ccccff";&ENDOFLINE&
                  vWeekendColor  = "9999ff";&ENDOFLINE&
                  vWeekdayGColor  = "bbbbff";&ENDOFLINE&
                  vWeekendGColor = "8888ff";&ENDOFLINE&
               }&ENDOFLINE& else {
                  vWeekdayColor = "ffffff";&ENDOFLINE&
                  vWeekendColor = "cfcfcf";&ENDOFLINE&
                  vWeekdayGColor = "f3f3f3";&ENDOFLINE&
                  vWeekendGColor = "c3c3c3";&ENDOFLINE&
               }&ENDOFLINE&
               if(vTmpDate.getDay() % 6 == 0) {&ENDOFLINE&
                  vDateRowStr  += &ENDOFLINE&'<td class="gheadwkend" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' +&ENDOFLINE& vWeekendColor + ' align=center><div style="width: '+&ENDOFLINE& vColWidth+'px">' + vTmpDate.getDate() + '</div></td>';&ENDOFLINE&
                  vItemRowStr  +=&ENDOFLINE& '<td class="gheadwkend" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' +&ENDOFLINE& vWeekendColor + ' align=center><div style="width: '+&ENDOFLINE&vColWidth+'px">&nbsp</div></td>';&ENDOFLINE&
               }&ENDOFLINE&
               else {&ENDOFLINE&
                  vDateRowStr += &ENDOFLINE&'<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+&ENDOFLINE&'px">' + vTmpDate.getDate() + '</div></td>';&ENDOFLINE&
                  if( JSGantt.formatDateStr(vCurrDate,'mm/dd/yyyy') == JSGantt.formatDateStr(vTmpDate,'mm/dd/yyyy')) &ENDOFLINE&
                     vItemRowStr += &ENDOFLINE&'<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekdayColor + &ENDOFLINE&' align=center><div style="width: '+vColWidth+&ENDOFLINE&'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
                  else
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
               }&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate() + 1);
            }&ENDOFLINE&
	         else if(vFormat == 'week')
            {
               vNxtDate.setDate(vNxtDate.getDate() + 7);
               if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
                  vWeekdayColor = "ccccff";&ENDOFLINE&
               else
                  vWeekdayColor = "ffffff";&ENDOFLINE&
               if(vNxtDate <= vMaxDate) {&ENDOFLINE&
                  vDateRowStr +=&ENDOFLINE& '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' +&ENDOFLINE& vWeekdayColor + ' align=center width:'+&ENDOFLINE& vColWidth+'px><div style="width: '+&ENDOFLINE& vColWidth+&ENDOFLINE&'px">' + (vTmpDate.getMonth()+1) + '/' + vTmpDate.getDate() + &ENDOFLINE&'</div></td>';&ENDOFLINE&
                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) &ENDOFLINE&
                     vItemRowStr +=&ENDOFLINE& '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + &ENDOFLINE&vWeekdayColor + &ENDOFLINE&' align=center><div style="width: '+&ENDOFLINE&vColWidth+'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
                  else
                     vItemRowStr += &ENDOFLINE&'<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
               }&ENDOFLINE& else {
                  vDateRowStr += &ENDOFLINE&'<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid; bgcolor=#' +&ENDOFLINE& vWeekdayColor + &ENDOFLINE&' BORDER-RIGHT: #efefef 1px solid;" align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">' + (vTmpDate.getMonth()+1) +&ENDOFLINE& '/' + vTmpDate.getDate() + '</div></td>';&ENDOFLINE&
                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) &ENDOFLINE&
                     vItemRowStr +=&ENDOFLINE& '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+&ENDOFLINE&'px">&nbsp&nbsp</div></td>';
                  else
                     vItemRowStr += &ENDOFLINE&'<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+&ENDOFLINE&'px">&nbsp&nbsp</div></td>';
               }&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate() + 7);
            }&ENDOFLINE&
	         else if(vFormat == 'month')
            {
               vNxtDate.setFullYear(vTmpDate.getFullYear(), vTmpDate.getMonth(), vMonthDaysArr[vTmpDate.getMonth()]);
               if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
                  vWeekdayColor = "ccccff";&ENDOFLINE&
               else
                  vWeekdayColor = "ffffff";&ENDOFLINE&
               if(vNxtDate <= vMaxDate) {
                  vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">' + vMonthArr[vTmpDate.getMonth()].substr(0,3) + '</div></td>';
                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) &ENDOFLINE&
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
                  else&ENDOFLINE&
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
               }&ENDOFLINE& else {&ENDOFLINE&
                  vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">' + vMonthArr[vTmpDate.getMonth()].substr(0,3) + '</div></td>';&ENDOFLINE&
                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) &ENDOFLINE&
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
                  else&ENDOFLINE&
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+&ENDOFLINE&'px">&nbsp&nbsp</div></td>';
               }&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate() + 1);&ENDOFLINE&
               while(vTmpDate.getDate() > 1) &ENDOFLINE&
               {&ENDOFLINE&
                  vTmpDate.setDate(vTmpDate.getDate() + 1);&ENDOFLINE&
               }&ENDOFLINE&
            }&ENDOFLINE&
	         else if(vFormat == 'quarter')&ENDOFLINE&
            {&ENDOFLINE&
               vNxtDate.setDate(vNxtDate.getDate() + 122);&ENDOFLINE&
               if( vTmpDate.getMonth()==0 || vTmpDate.getMonth()==1 || vTmpDate.getMonth()==2 )&ENDOFLINE&
                  vNxtDate.setFullYear(vTmpDate.getFullYear(), 2, 31);&ENDOFLINE&
               else if( vTmpDate.getMonth()==3 || vTmpDate.getMonth()==4 || vTmpDate.getMonth()==5 )&ENDOFLINE&
                  vNxtDate.setFullYear(vTmpDate.getFullYear(), 5, 30);&ENDOFLINE&
               else if( vTmpDate.getMonth()==6 || vTmpDate.getMonth()==7 || vTmpDate.getMonth()==8 )&ENDOFLINE&
                  vNxtDate.setFullYear(vTmpDate.getFullYear(), 8, 30);&ENDOFLINE&
               else if( vTmpDate.getMonth()==9 || vTmpDate.getMonth()==10 || vTmpDate.getMonth()==11 )&ENDOFLINE&
                  vNxtDate.setFullYear(vTmpDate.getFullYear(), 11, 31);&ENDOFLINE&
               if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) &ENDOFLINE&
                  vWeekdayColor = "ccccff";&ENDOFLINE&
               else
                  vWeekdayColor = "ffffff";&ENDOFLINE&
               if(vNxtDate <= vMaxDate) {&ENDOFLINE&
                  vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">Qtr. ' + vQuarterArr[vTmpDate.getMonth()] + '</div></td>';&ENDOFLINE&
                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) &ENDOFLINE&
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
                  else
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+&ENDOFLINE&'px">&nbsp&nbsp</div></td>';
               }&ENDOFLINE& else {
                  vDateRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 19px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">Qtr. ' + vQuarterArr[vTmpDate.getMonth()] + '</div></td>';&ENDOFLINE&
                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) &ENDOFLINE&
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor +&ENDOFLINE& ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
                  else 
                     vItemRowStr += '<td class="ghead" style="BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';&ENDOFLINE&
               }&ENDOFLINE&
               vTmpDate.setDate(vTmpDate.getDate() + 81);
               while(vTmpDate.getDate() > 1) 
               {
                  vTmpDate.setDate(vTmpDate.getDate() + 1);
               }&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
         vRightTable += vDateRowStr + '</TR>';
         vRightTable += '</TBODY></TABLE>';
         for(i = 0;&ENDOFLINE& i < vTaskList.length; i++)
         {
            vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());
            vTaskStart = vTaskList[i].getStart();&ENDOFLINE&
            vTaskEnd   = vTaskList[i].getEnd();&ENDOFLINE&
            vNumCols = 0;&ENDOFLINE&
            vID = vTaskList[i].getID();&ENDOFLINE&
            vNumUnits = (vTaskList[i].getEnd() - vTaskList[i].getStart()) / (24 * 60 * 60 * 1000) + 1;&ENDOFLINE&
	       if (vFormat=='hour')
	       {
                vNumUnits = (vTaskList[i].getEnd() - vTaskList[i].getStart()) / (  60 * 1000) + 1;&ENDOFLINE&
	       }&ENDOFLINE&
	       else if (vFormat=='minute')
	       {
                vNumUnits = (vTaskList[i].getEnd() - vTaskList[i].getStart()) / (  60 * 1000) + 1;&ENDOFLINE&
	       }&ENDOFLINE&
	         if(vTaskList[i].getVisible() == 0) &ENDOFLINE&
               vRightTable += '<DIV id=childgrid_' + vID + ' style="position:relative; display:none;">';&ENDOFLINE&
            else&ENDOFLINE&
		         vRightTable += '<DIV id=childgrid_' + vID + ' style="position:relative">';&ENDOFLINE&
            if( vTaskList[i].getMile()) {&ENDOFLINE&
               vRightTable += '<DIV><TABLE style="position:relative; top:0px; width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +&ENDOFLINE&
                  '<TR id=childrow_' + vID + ' class=yesdisplay style="HEIGHT: 20px" onMouseover=g.mouseOver(this,' + vID + ',"right","mile") onMouseout=g.mouseOut(this,' + vID + ',"right","mile")>' + vItemRowStr + '</TR></TABLE></DIV>';&ENDOFLINE&
               vDateRowStr = JSGantt.formatDateStr(vTaskStart,vDateDisplayFormat);&ENDOFLINE&
               vTaskLeft = (Date.parse(vTaskList[i].getStart()) - Date.parse(vMinDate)) / (24 * 60 * 60 * 1000);&ENDOFLINE&
               vTaskRight = 1;
  	            vRightTable +=&ENDOFLINE&
                  '<div id=bardiv_' + vID + ' style="position:absolute; top:0px; left:' + (Math.ceil((vTaskLeft * (vDayWidth) + 1))+6) +&ENDOFLINE& 'px; height: 18px; width:160px; overflow:hidden;">' +&ENDOFLINE&
                  ((vTaskList[i].getLinkIsAction()==1)?&ENDOFLINE&
                  '  <div id=taskbar_' + vID + ' title="' + vTaskList[i].getName() +&ENDOFLINE& ': ' + vDateRowStr + '" class="taskBar" onclick="' + vTaskList[i].getLink()+';">':&ENDOFLINE&
               	'  <div id=taskbar_' + vID + ' title="' + vTaskList[i].getName() + ': ' + vDateRowStr + '" class="taskBar" onclick=JSGantt.taskLink("' + vTaskList[i].getLink() + '",300,200);>');&ENDOFLINE&
               if(vTaskList[i].getCompVal() < 100)&ENDOFLINE&
 		            vRightTable += '&loz;</div>' ;&ENDOFLINE&
               else
 		            vRightTable += '&diams;</div>' ;&ENDOFLINE&
                        if( g.getCaptionType() ) {&ENDOFLINE&
                           vCaptionStr = '';&ENDOFLINE&
                           switch( g.getCaptionType() ) {      &ENDOFLINE&     
                              case 'Caption':    vCaptionStr = vTaskList[i].getCaption();&ENDOFLINE&  break;
                              case 'Resource':   vCaptionStr = vTaskList[i].getResource();&ENDOFLINE&  break;
                              case 'Duration':   vCaptionStr = vTaskList[i].getDuration(vFormat);  break;
                              case 'Complete':   vCaptionStr = vTaskList[i].getCompStr();&ENDOFLINE&  break;
		                     }&ENDOFLINE&
                           vRightTable += '<div style="FONT-SIZE:12px; position:absolute; top:2px; width:120px; left:12px">' + vCaptionStr + '</div>';&ENDOFLINE&
	                  }&ENDOFLINE&
  	            vRightTable += '</div>';
            }&ENDOFLINE& else {
               vDateRowStr = JSGantt.formatDateStr(vTaskStart,vDateDisplayFormat) + ' - ' + JSGantt.formatDateStr(vTaskEnd,vDateDisplayFormat)&ENDOFLINE&
                if (vFormat=='minute')
                {&ENDOFLINE&
                    vTaskRight = (Date.parse(vTaskList[i].getEnd()) - Date.parse(vTaskList[i].getStart())) / ( 60 * 1000) + 1/vColUnit;&ENDOFLINE&
                    vTaskLeft = Math.ceil((Date.parse(vTaskList[i].getStart()) - Date.parse(vMinDate)) / ( 60 * 1000));&ENDOFLINE&
                }&ENDOFLINE&
                else if (vFormat=='hour')
                {
                    vTaskRight = (Date.parse(vTaskList[i].getEnd()) - Date.parse(vTaskList[i].getStart())) / ( 60 * 60 * 1000) + 1/vColUnit;&ENDOFLINE&
                    vTaskLeft = (Date.parse(vTaskList[i].getStart()) - Date.parse(vMinDate)) / ( 60 * 60 * 1000);&ENDOFLINE&
                }&ENDOFLINE&
                else
                {
                    vTaskRight = (Date.parse(vTaskList[i].getEnd()) - Date.parse(vTaskList[i].getStart())) / (24 * 60 * 60 * 1000) + 1/vColUnit;&ENDOFLINE&
                    vTaskLeft = Math.ceil((Date.parse(vTaskList[i].getStart()) - Date.parse(vMinDate)) / (24 * 60 * 60 * 1000));&ENDOFLINE&
                    if (vFormat='day')&ENDOFLINE&
                    {
                        var tTime=new Date();&ENDOFLINE&
                        tTime.setTime(Date.parse(vTaskList[i].getStart()));&ENDOFLINE&
                        if (tTime.getMinutes() > 29)&ENDOFLINE&
                            vTaskLeft+=.5&ENDOFLINE&
                    }&ENDOFLINE&
                }&ENDOFLINE&
               if( vTaskList[i].getGroup()) {&ENDOFLINE&
                  vRightTable += '<DIV><TABLE style="position:relative; top:0px; width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +&ENDOFLINE&
                     '<TR id=childrow_' + vID + ' class=yesdisplay style="HEIGHT: 20px" bgColor=#f3f3f3 onMouseover=g.mouseOver(this,' + vID + ',"right","group") onMouseout=g.mouseOut(this,' + vID + ',"right","group")>' + vItemRowStr + '</TR></TABLE></DIV>';&ENDOFLINE&
                  vRightTable +=&ENDOFLINE&
                     '<div id=bardiv_' + vID + ' style="position:absolute; top:5px; left:' +&ENDOFLINE& Math.ceil(vTaskLeft * (vDayWidth) + 1) + 'px; height: 7px; width:' + Math.ceil((vTaskRight) * (vDayWidth) - 1) + 'px">' +&ENDOFLINE&
                       '<div id=taskbar_' + vID + ' title="' + vTaskList[i].getName() +&ENDOFLINE& ': ' + vDateRowStr + '" class=gtask style="background-color:#428bca; border-radius:4px 4px 0 0; height: 10px; width:' + Math.ceil((vTaskRight) * (vDayWidth) -1) + &ENDOFLINE& 'px;  cursor: pointer;opacity:0.9;">' +&ENDOFLINE&
                         '<div style="Z-INDEX: -4; float:left; background-color:#666666; height:3px; overflow: hidden; margin-top:1px; ' +&ENDOFLINE&
                               'margin-left:1px; margin-right:1px; filter: alpha(opacity=80); opacity:0.8; width:' + vTaskList[i].getCompStr() + '; ' + &ENDOFLINE&
                               ((vTaskList[i].getLinkIsAction()==1)?&ENDOFLINE&
                               'cursor: pointer;" onclick="' + vTaskList[i].getLink()+';">' :&ENDOFLINE&
                               'cursor: pointer;" onclick=JSGantt.taskLink("' + vTaskList[i].getLink() + '",300,200);>') +&ENDOFLINE&
                           '</div>' +&ENDOFLINE&
                        '</div>' +&ENDOFLINE&
                        '<div style="Z-INDEX: -4; float:left; background-color:#428bca; height:4px; overflow: hidden; width:1px;"></div>' +&ENDOFLINE&
                        '<div style="Z-INDEX: -4; float:right; background-color:#428bca; height:4px; overflow: hidden; width:1px;"></div>' +&ENDOFLINE&
                        '<div style="Z-INDEX: -4; float:left; background-color:#428bca; height:3px; overflow: hidden; width:1px;"></div>' +&ENDOFLINE&
                        '<div style="Z-INDEX: -4; float:right; background-color:#428bca; height:3px; overflow: hidden; width:1px;"></div>' +&ENDOFLINE&
                        '<div style="Z-INDEX: -4; float:left; background-color:#428bca; height:2px; overflow: hidden; width:1px;"></div>' +&ENDOFLINE&
                        '<div style="Z-INDEX: -4; float:right; background-color:#428bca; height:2px; overflow: hidden; width:1px;"></div>' +&ENDOFLINE&
                        '<div style="Z-INDEX: -4; float:left; background-color:#428bca; height:1px; overflow: hidden; width:1px;"></div>' +&ENDOFLINE&
                        '<div style="Z-INDEX: -4; float:right; background-color:#428bca; height:1px; overflow: hidden; width:1px;"></div>' ;&ENDOFLINE&
                        if( g.getCaptionType() ) {&ENDOFLINE&
                           vCaptionStr = '';&ENDOFLINE&
                           switch( g.getCaptionType() ) {           
                              case 'Caption':    vCaptionStr = vTaskList[i].getCaption();&ENDOFLINE&  break;
                              case 'Resource':   vCaptionStr = vTaskList[i].getResource();&ENDOFLINE&  break;
                              case 'Duration':   vCaptionStr = vTaskList[i].getDuration(vFormat);  break;
                              case 'Complete':   vCaptionStr = vTaskList[i].getCompStr();&ENDOFLINE&  break;
		                     }&ENDOFLINE&
                           vRightTable += '<div style="FONT-SIZE:12px; position:absolute; top:-3px; width:120px; left:' + (Math.ceil((vTaskRight) * (vDayWidth) - 1) + 6) + 'px">' + vCaptionStr + '</div>';&ENDOFLINE&
	                  }&ENDOFLINE&
                  vRightTable += '</div>' ;
               }&ENDOFLINE& else {
                  vDivStr = '<DIV><TABLE style="position:relative; top:0px; width: ' + vChartWidth +&ENDOFLINE& 'px;" cellSpacing=0 cellPadding=0 border=0>' +&ENDOFLINE&
                     '<TR id=childrow_' + vID + ' class=yesdisplay style="HEIGHT: 20px" bgColor=#ffffff onMouseover=g.mouseOver(this,' + vID + ',"right","row") onMouseout=g.mouseOut(this,' + vID + ',"right","row")>' + vItemRowStr + '</TR></TABLE></DIV>';&ENDOFLINE&
                  vRightTable += vDivStr;&ENDOFLINE&
	            vRightTable +=&ENDOFLINE&
                     '<div id=bardiv_' + vID + ' style="position:absolute; top:4px; left:' + Math.ceil(vTaskLeft * (vDayWidth) + 1) + 'px; height:18px; width:' + Math.ceil((vTaskRight) * (vDayWidth) - 1) + 'px">' +&ENDOFLINE&
                        '<div id=taskbar_' + vID + ' title="' + vTaskList[i].getName() + ': ' + vDateRowStr + '" class=gtask style="background-color:#' + vTaskList[i].getColor() +'; height: 13px; width:' + Math.ceil((vTaskRight) * (vDayWidth) - 1) +&ENDOFLINE& 'px; cursor: pointer;opacity:0.9;" ' +&ENDOFLINE&
                        ((vTaskList[i].getLinkIsAction()==1)?&ENDOFLINE&   
                        'onclick="' + vTaskList[i].getLink() + ';" >' :&ENDOFLINE&
                        'onclick=JSGantt.taskLink("' + vTaskList[i].getLink() + '",300,200); >') +&ENDOFLINE&
                           '<div class=gcomplete style="Z-INDEX: -4; float:left; background-color:black; height:5px; overflow: auto; margin-top:4px; filter: alpha(opacity=40); opacity:0.4; width:' + vTaskList[i].getCompStr() + '; overflow:hidden">' +&ENDOFLINE&
                           '</div>' +&ENDOFLINE&
                        '</div>';&ENDOFLINE&
                        if( g.getCaptionType() ) {&ENDOFLINE&
                           vCaptionStr = '';&ENDOFLINE&
                           switch( g.getCaptionType() ) { &ENDOFLINE&
                              case 'Caption':    vCaptionStr = vTaskList[i].getCaption();&ENDOFLINE&  break;
                              case 'Resource':   vCaptionStr = vTaskList[i].getResource();&ENDOFLINE&  break;
                              case 'Duration':   vCaptionStr = vTaskList[i].getDuration(vFormat);  break;
                              case 'Complete':   vCaptionStr = vTaskList[i].getCompStr();&ENDOFLINE&  break;
		                     }&ENDOFLINE&
                           vRightTable += '<div style="FONT-SIZE:12px; position:absolute; top:-3px; width:120px; left:' +&ENDOFLINE& (Math.ceil((vTaskRight) * (vDayWidth) - 1) + 6) + 'px">' + vCaptionStr + '</div>';&ENDOFLINE&
	                  }&ENDOFLINE&
                  vRightTable += '</div>' ;&ENDOFLINE&
               }&ENDOFLINE&
            }&ENDOFLINE&
            vRightTable += '</DIV>';&ENDOFLINE&
         }&ENDOFLINE&
         vMainTable += vRightTable + '</DIV></TD></TR></TBODY></TABLE></BODY></HTML>';&ENDOFLINE&
		   vDiv.innerHTML = vMainTable;&ENDOFLINE&
      }&ENDOFLINE&
   }&ENDOFLINE& 
   this.mouseOver = function( pObj, pID, pPos, pType ) {&ENDOFLINE&
      if( pPos == 'right' )  vID = 'child_' + pID;&ENDOFLINE&
      else vID = 'childrow_' + pID;&ENDOFLINE&
      pObj.bgColor = "#ffffaa";&ENDOFLINE&
      vRowObj = JSGantt.findObj(vID);&ENDOFLINE&
      if (vRowObj) vRowObj.bgColor = "#ffffaa";&ENDOFLINE&
   }&ENDOFLINE&
   this.mouseOut = function( pObj, pID, pPos, pType ) {&ENDOFLINE&
      if( pPos == 'right' )  vID = 'child_' + pID;&ENDOFLINE&
      else vID = 'childrow_' + pID;&ENDOFLINE&
      pObj.bgColor = "#ffffff";&ENDOFLINE&
      vRowObj = JSGantt.findObj(vID);&ENDOFLINE&
      if (vRowObj) {&ENDOFLINE&
         if( pType == "group") {&ENDOFLINE&
            pObj.bgColor = "#f3f3f3";&ENDOFLINE&
            vRowObj.bgColor = "#f3f3f3";&ENDOFLINE&
         }&ENDOFLINE& else {&ENDOFLINE&
            pObj.bgColor = "#ffffff";&ENDOFLINE&
            vRowObj.bgColor = "#ffffff";&ENDOFLINE&
         }&ENDOFLINE&
      }&ENDOFLINE&
   }&ENDOFLINE&
}&ENDOFLINE& 
JSGantt.processRows = function(pList, pID, pRow, pLevel, pOpen)&ENDOFLINE&
{
   var vMinDate = new Date();&ENDOFLINE&
   var vMaxDate = new Date();&ENDOFLINE&
   var vMinSet  = 0;&ENDOFLINE&
   var vMaxSet  = 0;&ENDOFLINE&
   var vList    = pList;
   var vLevel   = pLevel;
   var i        = 0;&ENDOFLINE&
   var vNumKid  = 0;&ENDOFLINE&
   var vCompSum = 0;&ENDOFLINE&
   var vVisible = pOpen;
   for(i = 0;&ENDOFLINE& i < pList.length; i++)
   {
      if(pList[i].getParent() == pID) {&ENDOFLINE&
		 vVisible = pOpen;&ENDOFLINE&
         pList[i].setVisible(vVisible);&ENDOFLINE&
         if(vVisible==1 && pList[i].getOpen() == 0) &ENDOFLINE&
            vVisible = 0;&ENDOFLINE&
         pList[i].setLevel(vLevel);&ENDOFLINE&
         vNumKid++;&ENDOFLINE&
         if(pList[i].getGroup() == 1) {&ENDOFLINE&
            JSGantt.processRows(vList, pList[i].getID(), i, vLevel+1, vVisible);&ENDOFLINE&
         }&ENDOFLINE&
         if( vMinSet==0 || pList[i].getStart() < vMinDate) {&ENDOFLINE&
            vMinDate = pList[i].getStart();&ENDOFLINE&
            vMinSet = 1;&ENDOFLINE&
         }&ENDOFLINE&
         if( vMaxSet==0 || pList[i].getEnd() > vMaxDate) {&ENDOFLINE&
            vMaxDate = pList[i].getEnd();&ENDOFLINE&
            vMaxSet = 1;&ENDOFLINE&
         }&ENDOFLINE&
         vCompSum += pList[i].getCompVal();&ENDOFLINE&
      }&ENDOFLINE&
   }&ENDOFLINE&
   if(pRow >= 0) {&ENDOFLINE&
      pList[pRow].setStart(vMinDate);&ENDOFLINE&
      pList[pRow].setEnd(vMaxDate);&ENDOFLINE&
      pList[pRow].setNumKid(vNumKid);&ENDOFLINE&
      pList[pRow].setCompVal(Math.ceil(vCompSum/vNumKid));&ENDOFLINE&
   }&ENDOFLINE&
}&ENDOFLINE&
JSGantt.getMinDate = function getMinDate(pList, pFormat) &ENDOFLINE& 
      {
         var vDate = new Date();&ENDOFLINE&
         vDate.setFullYear(pList[0].getStart().getFullYear(), pList[0].getStart().getMonth(), pList[0].getStart().getDate());
         for(i = 0;&ENDOFLINE& i < pList.length; i++)&ENDOFLINE&
         {
            if(Date.parse(pList[i].getStart()) < Date.parse(vDate))&ENDOFLINE&
               vDate.setFullYear(pList[i].getStart().getFullYear(), pList[i].getStart().getMonth(), pList[i].getStart().getDate());&ENDOFLINE&
         }&ENDOFLINE&
         if ( pFormat== 'minute')&ENDOFLINE&
         {&ENDOFLINE&
            vDate.setHours(0);&ENDOFLINE&
            vDate.setMinutes(0);&ENDOFLINE&
         }&ENDOFLINE&
		 else if (pFormat == 'hour' )&ENDOFLINE&
         {&ENDOFLINE&
            vDate.setHours(0);&ENDOFLINE&
            vDate.setMinutes(0);&ENDOFLINE&
         }&ENDOFLINE&
         else if (pFormat=='day')&ENDOFLINE&
         {&ENDOFLINE&
            vDate.setDate(vDate.getDate() - 1);&ENDOFLINE&
            while(vDate.getDay() % 7 > 0)&ENDOFLINE&
            {&ENDOFLINE&
                vDate.setDate(vDate.getDate() - 1);&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
         else if (pFormat=='week')&ENDOFLINE&
         {
            vDate.setDate(vDate.getDate() - 7);&ENDOFLINE&
            while(vDate.getDay() % 7 > 0)&ENDOFLINE&
            {&ENDOFLINE&
                vDate.setDate(vDate.getDate() - 1);&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
         else if (pFormat=='month')&ENDOFLINE&
         {&ENDOFLINE&
            while(vDate.getDate() > 1)&ENDOFLINE&
            {&ENDOFLINE&
                vDate.setDate(vDate.getDate() - 1);&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
         else if (pFormat=='quarter')&ENDOFLINE&
         {&ENDOFLINE&
            if( vDate.getMonth()==0 || vDate.getMonth()==1 || vDate.getMonth()==2 )&ENDOFLINE&
               vDate.setFullYear(vDate.getFullYear(), 0, 1);&ENDOFLINE&
            else if( vDate.getMonth()==3 || vDate.getMonth()==4 || vDate.getMonth()==5 )&ENDOFLINE&
               vDate.setFullYear(vDate.getFullYear(), 3, 1);&ENDOFLINE&
            else if( vDate.getMonth()==6 || vDate.getMonth()==7 || vDate.getMonth()==8 )&ENDOFLINE&
               vDate.setFullYear(vDate.getFullYear(), 6, 1);&ENDOFLINE&
            else if( vDate.getMonth()==9 || vDate.getMonth()==10 || vDate.getMonth()==11 )&ENDOFLINE&
               vDate.setFullYear(vDate.getFullYear(), 9, 1);&ENDOFLINE&
         }&ENDOFLINE&
         return(vDate);&ENDOFLINE&
      }&ENDOFLINE&
JSGantt.getMaxDate = function (pList, pFormat)&ENDOFLINE&
{&ENDOFLINE&
   var vDate = new Date();&ENDOFLINE&
         vDate.setFullYear(pList[0].getEnd().getFullYear(), pList[0].getEnd().getMonth(), pList[0].getEnd().getDate());&ENDOFLINE&
         for(i = 0;&ENDOFLINE& i < pList.length; i++)&ENDOFLINE&
         {
            if(Date.parse(pList[i].getEnd()) > Date.parse(vDate))&ENDOFLINE&
            {
                 vDate.setTime(Date.parse(pList[i].getEnd()));&ENDOFLINE&
			}&ENDOFLINE&	
	     }&ENDOFLINE&
	     if (pFormat == 'minute')&ENDOFLINE&
         {
            vDate.setHours(vDate.getHours() + 1);&ENDOFLINE&
            vDate.setMinutes(59);&ENDOFLINE&
         }&ENDOFLINE&	
         if (pFormat == 'hour')&ENDOFLINE&
         {
            vDate.setHours(vDate.getHours() + 2);&ENDOFLINE&
         }&ENDOFLINE&				
         if (pFormat=='day')&ENDOFLINE&
         {
            vDate.setDate(vDate.getDate() + 1);&ENDOFLINE&
            while(vDate.getDay() % 6 > 0)&ENDOFLINE&
            {
                vDate.setDate(vDate.getDate() + 1);&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
         if (pFormat=='week')&ENDOFLINE&
         {
            vDate.setDate(vDate.getDate() + 11);&ENDOFLINE&
            while(vDate.getDay() % 6 > 0)&ENDOFLINE&
            {
                vDate.setDate(vDate.getDate() + 1);&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
         if (pFormat=='month')&ENDOFLINE&
         {
            while(vDate.getDay() > 1)&ENDOFLINE&
            {
                vDate.setDate(vDate.getDate() + 1);&ENDOFLINE&
            }&ENDOFLINE&
            vDate.setDate(vDate.getDate() - 1);&ENDOFLINE&
         }&ENDOFLINE&
         if (pFormat=='quarter')&ENDOFLINE&
         {
            if( vDate.getMonth()==0 || vDate.getMonth()==1 || vDate.getMonth()==2 )&ENDOFLINE&
               vDate.setFullYear(vDate.getFullYear(), 2, 31);&ENDOFLINE&
            else if( vDate.getMonth()==3 || vDate.getMonth()==4 || vDate.getMonth()==5 )&ENDOFLINE&
               vDate.setFullYear(vDate.getFullYear(), 5, 30);&ENDOFLINE&
            else if( vDate.getMonth()==6 || vDate.getMonth()==7 || vDate.getMonth()==8 )&ENDOFLINE&
               vDate.setFullYear(vDate.getFullYear(), 8, 30);&ENDOFLINE&
            else if( vDate.getMonth()==9 || vDate.getMonth()==10 || vDate.getMonth()==11 )&ENDOFLINE&
               vDate.setFullYear(vDate.getFullYear(), 11, 31);&ENDOFLINE&
         }&ENDOFLINE&
         return(vDate);&ENDOFLINE&
      }&ENDOFLINE&
JSGantt.findObj = function (theObj, theDoc)&ENDOFLINE&
      {&ENDOFLINE&
         var p, i, foundObj;&ENDOFLINE&
         if(!theDoc) theDoc = document;&ENDOFLINE&
         if( (p = theObj.indexOf("?")) > 0 && parent.frames.length){&ENDOFLINE&
            theDoc = parent.frames[theObj.substring(p+1)].document;&ENDOFLINE&
            theObj = theObj.substring(0,p);&ENDOFLINE&
         }&ENDOFLINE&
         if(!(foundObj = theDoc[theObj]) && theDoc.all) &ENDOFLINE&
            foundObj = theDoc.all[theObj];&ENDOFLINE&
         for (i=0;&ENDOFLINE& !foundObj && i < theDoc.forms.length; i++)&ENDOFLINE& 
            foundObj = theDoc.forms[i][theObj];&ENDOFLINE&
         for(i=0;&ENDOFLINE& !foundObj && theDoc.layers && i < theDoc.layers.length; i++)&ENDOFLINE&
            foundObj = JSGantt.findObj(theObj,theDoc.layers[i].document);&ENDOFLINE&
         if(!foundObj && document.getElementById)&ENDOFLINE&
            foundObj = document.getElementById(theObj);&ENDOFLINE&
         return foundObj;&ENDOFLINE&
      }&ENDOFLINE&
JSGantt.changeFormat =      function(pFormat,ganttObj) {&ENDOFLINE&
        if(ganttObj) &ENDOFLINE&
		{
		ganttObj.setFormat(pFormat);&ENDOFLINE&
		ganttObj.DrawDependencies();&ENDOFLINE&
		}&ENDOFLINE&
        else&ENDOFLINE&
           alert('Chart undefined');&ENDOFLINE&
      }&ENDOFLINE&
JSGantt.folder= function (pID,ganttObj) {&ENDOFLINE&
   var vList = ganttObj.getList();&ENDOFLINE&
   for(i = 0;&ENDOFLINE& i < vList.length; i++)&ENDOFLINE&
   {&ENDOFLINE&
      if(vList[i].getID() == pID) {&ENDOFLINE&
         if( vList[i].getOpen() == 1 ) {&ENDOFLINE&
            vList[i].setOpen(0);&ENDOFLINE&
            JSGantt.hide(pID,ganttObj);&ENDOFLINE&
            if (JSGantt.isIE()) &ENDOFLINE&
               JSGantt.findObj('group_'+pID).innerText = '+';&ENDOFLINE&
            else&ENDOFLINE&
               JSGantt.findObj('group_'+pID).textContent = '+';&ENDOFLINE&
         }&ENDOFLINE& else {&ENDOFLINE&
            vList[i].setOpen(1);&ENDOFLINE&
            JSGantt.show(pID, 1, ganttObj);&ENDOFLINE&
               if (JSGantt.isIE()) &ENDOFLINE&
                  JSGantt.findObj('group_'+pID).innerText = '�';&ENDOFLINE&
               else
                  JSGantt.findObj('group_'+pID).textContent = '�';&ENDOFLINE&
         }&ENDOFLINE&
      }&ENDOFLINE&
   }&ENDOFLINE&
}&ENDOFLINE&
JSGantt.hide=     function (pID,ganttObj) {
   var vList = ganttObj.getList();&ENDOFLINE&
   var vID   = 0;&ENDOFLINE&
   for(var i = 0;&ENDOFLINE& i < vList.length; i++)&ENDOFLINE&
   {
      if(vList[i].getParent() == pID) {&ENDOFLINE&
         vID = vList[i].getID();&ENDOFLINE&
         JSGantt.findObj('child_' + vID).style.display = "none";&ENDOFLINE&
         JSGantt.findObj('childgrid_' + vID).style.display = "none";&ENDOFLINE&
         vList[i].setVisible(0);&ENDOFLINE&
         if(vList[i].getGroup() == 1) &ENDOFLINE&
            JSGantt.hide(vID,ganttObj);&ENDOFLINE&
      }&ENDOFLINE&
   }&ENDOFLINE&
}&ENDOFLINE&
JSGantt.show =  function (pID, pTop, ganttObj) {&ENDOFLINE&
   var vList = ganttObj.getList();&ENDOFLINE&
   var vID   = 0;&ENDOFLINE&
   for(var i = 0;&ENDOFLINE& i < vList.length; i++)&ENDOFLINE&
   {
      if(vList[i].getParent() == pID) {&ENDOFLINE&
         vID = vList[i].getID();&ENDOFLINE&
         if(pTop == 1) {&ENDOFLINE&
            if (JSGantt.isIE()) { &ENDOFLINE&
               if( JSGantt.findObj('group_'+pID).innerText == '+') {&ENDOFLINE&
                  JSGantt.findObj('child_'+vID).style.display = "";&ENDOFLINE&
                  JSGantt.findObj('childgrid_'+vID).style.display = "";&ENDOFLINE&
                  vList[i].setVisible(1);&ENDOFLINE&
               }&ENDOFLINE&
            }&ENDOFLINE& else {&ENDOFLINE&
               if( JSGantt.findObj('group_'+pID).textContent == '+') {&ENDOFLINE&
                  JSGantt.findObj('child_'+vID).style.display = "";&ENDOFLINE&
                  JSGantt.findObj('childgrid_'+vID).style.display = "";&ENDOFLINE&
                  vList[i].setVisible(1);&ENDOFLINE&
               }&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE& else {&ENDOFLINE&
            if (JSGantt.isIE()) { &ENDOFLINE&
               if( JSGantt.findObj('group_'+pID).innerText == '�') {&ENDOFLINE&
                  JSGantt.findObj('child_'+vID).style.display = "";&ENDOFLINE&
                  JSGantt.findObj('childgrid_'+vID).style.display = "";&ENDOFLINE&
                  vList[i].setVisible(1);&ENDOFLINE&
               }&ENDOFLINE&
            }&ENDOFLINE& else {&ENDOFLINE&
               if( JSGantt.findObj('group_'+pID).textContent == '�') {&ENDOFLINE&
                  JSGantt.findObj('child_'+vID).style.display = "";&ENDOFLINE&
                  JSGantt.findObj('childgrid_'+vID).style.display = "";&ENDOFLINE&
                  vList[i].setVisible(1);&ENDOFLINE&
               }&ENDOFLINE&
            }&ENDOFLINE&
         }&ENDOFLINE&
         if(vList[i].getGroup() == 1) &ENDOFLINE&
            JSGantt.show(vID, 0,ganttObj);&ENDOFLINE&
      }&ENDOFLINE&
   }&ENDOFLINE&
}&ENDOFLINE&
JSGantt.taskLink = function(pRef,pWidth,pHeight) &ENDOFLINE&
  {&ENDOFLINE&
    if(pWidth)  vWidth =pWidth;  else vWidth =400;&ENDOFLINE&
    if(pHeight) vHeight=pHeight; else vHeight=400;&ENDOFLINE&
    var OpenWindow=window.open(pRef, "newwin", "height="+vHeight+",width="+vWidth); &ENDOFLINE&
  }&ENDOFLINE&
JSGantt.parseDateStr = function(pDateStr,pFormatStr) {&ENDOFLINE&
   var vDate =new Date();&ENDOFLINE&	
   vDate.setTime( Date.parse(pDateStr));&ENDOFLINE&
   switch(pFormatStr) &ENDOFLINE&
   {
	  case 'mm/dd/yyyy':
	     var vDateParts = pDateStr.split('/');&ENDOFLINE&
         vDate.setFullYear(parseInt(vDateParts[2], 10), parseInt(vDateParts[0], 10) - 1, parseInt(vDateParts[1], 10));&ENDOFLINE&
         break;
	  case 'dd/mm/yyyy':
	     var vDateParts = pDateStr.split('/');&ENDOFLINE&
         vDate.setFullYear(parseInt(vDateParts[2], 10), parseInt(vDateParts[1], 10) - 1, parseInt(vDateParts[0], 10));&ENDOFLINE&
         break;
	  case 'yyyy-mm-dd':
	     var vDateParts = pDateStr.split('-');&ENDOFLINE&
         vDate.setFullYear(parseInt(vDateParts[0], 10), parseInt(vDateParts[1], 10) - 1, parseInt(vDateParts[1], 10));&ENDOFLINE&
         break;
    }&ENDOFLINE&
    return(vDate);
}&ENDOFLINE&
JSGantt.formatDateStr = function(pDate,pFormatStr) {&ENDOFLINE&
       vYear4Str = pDate.getFullYear() + '';&ENDOFLINE&
 	   vYear2Str = vYear4Str.substring(2,4);&ENDOFLINE&
       vMonthStr = (pDate.getMonth()+1) + '';&ENDOFLINE&
       vDayStr   = pDate.getDate() + '';&ENDOFLINE&
      var vDateStr = "";&ENDOFLINE&	
      switch(pFormatStr) {
	        case 'mm/dd/yyyy':&ENDOFLINE&
               return( vMonthStr + '/' + vDayStr + '/' + vYear4Str );&ENDOFLINE&
	        case 'dd/mm/yyyy':&ENDOFLINE&
               return( vDayStr + '/' + vMonthStr + '/' + vYear4Str );&ENDOFLINE&
	        case 'yyyy-mm-dd':&ENDOFLINE&
               return( vYear4Str + '-' + vMonthStr + '-' + vDayStr );&ENDOFLINE&
	        case 'mm/dd/yy':&ENDOFLINE&
               return( vMonthStr + '/' + vDayStr + '/' + vYear2Str );&ENDOFLINE&
	        case 'dd/mm/yy':
               return( vDayStr + '/' + vMonthStr + '/' + vYear2Str );&ENDOFLINE&
	        case 'yy-mm-dd':&ENDOFLINE&
               return( vYear2Str + '-' + vMonthStr + '-' + vDayStr );&ENDOFLINE&
	        case 'mm/dd':&ENDOFLINE&
               return( vMonthStr + '/' + vDayStr );&ENDOFLINE&
	        case 'dd/mm':&ENDOFLINE&
               return( vDayStr + '/' + vMonthStr );&ENDOFLINE&
      }&ENDOFLINE&		 
}&ENDOFLINE&
JSGantt.parseXML = function(ThisFile,pGanttVar){&ENDOFLINE&
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;   &ENDOFLINE&
	try { &ENDOFLINE&
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");&ENDOFLINE&
		}&ENDOFLINE&
	catch(e) {&ENDOFLINE&
		try { &ENDOFLINE&
			if (is_chrome==false) {  xmlDoc=document.implementation.createDocument("","",null); }&ENDOFLINE&
		}&ENDOFLINE&
		catch(e) {&ENDOFLINE&
			alert(e.message);&ENDOFLINE&
			return;&ENDOFLINE&
		}&ENDOFLINE&
	}&ENDOFLINE&
	if (is_chrome==false) { 	
		xmlDoc.async=false;
		xmlDoc.load(ThisFile);		
		JSGantt.AddXMLTask(pGanttVar);
		xmlDoc=null;			
		Task = null;
	}&ENDOFLINE&
	else {
		JSGantt.ChromeLoadXML(ThisFile,pGanttVar);	
		ta=null;	
	}&ENDOFLINE&
}&ENDOFLINE&
JSGantt.AddXMLTask = function(pGanttVar){
	Task=xmlDoc.getElementsByTagName("task");
	var n = xmlDoc.documentElement.childNodes.length;	
	for(var i=0;&ENDOFLINE&i<n;i++) {
		try { pID = Task[i].getElementsByTagName("pID")[0].childNodes[0].nodeValue;
		}&ENDOFLINE& catch (error) {pID =0;&ENDOFLINE&}&ENDOFLINE&
		pID *= 1;	
		if(pID!=0){
	 		try { pName = Task[i].getElementsByTagName("pName")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) {pName ="No Task Name";&ENDOFLINE&}&ENDOFLINE&			
			try { pColor = Task[i].getElementsByTagName("pColor")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) {pColor ="0000ff";&ENDOFLINE&}&ENDOFLINE&
			try { pParent = Task[i].getElementsByTagName("pParent")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) {pParent =0;&ENDOFLINE&}&ENDOFLINE&
			pParent *= 1;
			try { pStart = Task[i].getElementsByTagName("pStart")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) {pStart ="";&ENDOFLINE&}&ENDOFLINE&
			try { pEnd = Task[i].getElementsByTagName("pEnd")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) { pEnd ="";&ENDOFLINE&}&ENDOFLINE&
			try { pLink = Task[i].getElementsByTagName("pLink")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) { pLink ="";&ENDOFLINE&}&ENDOFLINE&
			try { pMile = Task[i].getElementsByTagName("pMile")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) { pMile=0;&ENDOFLINE&}&ENDOFLINE&
			pMile *= 1;
			try { pRes = Task[i].getElementsByTagName("pRes")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) { pRes ="";&ENDOFLINE&}&ENDOFLINE&
			try { pComp = Task[i].getElementsByTagName("pComp")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) {pComp =0;&ENDOFLINE&}&ENDOFLINE&
			pComp *= 1;&ENDOFLINE&
			try { pGroup = Task[i].getElementsByTagName("pGroup")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) {pGroup =0;&ENDOFLINE&}&ENDOFLINE&
			pGroup *= 1;
			try { pOpen = Task[i].getElementsByTagName("pOpen")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) { pOpen =1;}&ENDOFLINE&
			pOpen *= 1;
			try { pDepend = Task[i].getElementsByTagName("pDepend")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) { pDepend =0;&ENDOFLINE&}&ENDOFLINE&
			if (pDepend.length==0){pDepend=''}&ENDOFLINE& 
			try { pCaption = Task[i].getElementsByTagName("pCaption")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) { pCaption ="";&ENDOFLINE&}&ENDOFLINE&
			try { pActionLink = Task[i].getElementsByTagName("pActionLink")[0].childNodes[0].nodeValue;&ENDOFLINE&
			}&ENDOFLINE& catch (error) { pActionLink =0;&ENDOFLINE&}&ENDOFLINE&
			pActionLink *= 1;&ENDOFLINE&
			pGanttVar.AddTaskItem(new JSGantt.TaskItem(pID , pName, pStart, pEnd, pColor,  pLink, pMile, pRes,  pComp, pGroup, pParent, pOpen, pDepend,pCaption,pActionLink));&ENDOFLINE&
		}&ENDOFLINE&
	}&ENDOFLINE&
}&ENDOFLINE&
JSGantt.ChromeLoadXML = function(ThisFile,pGanttVar){&ENDOFLINE&
	XMLLoader = new XMLHttpRequest();&ENDOFLINE&
	XMLLoader.onreadystatechange= function(){&ENDOFLINE&
    JSGantt.ChromeXMLParse(pGanttVar);&ENDOFLINE&
	}&ENDOFLINE&;
	XMLLoader.open("GET", ThisFile, false);&ENDOFLINE&
	XMLLoader.send(null);&ENDOFLINE&
}&ENDOFLINE&
JSGantt.parseJSON = function (json,pGanttVar){&ENDOFLINE&
		var n = json.tasks.length;	&ENDOFLINE&
		for(var i=0;&ENDOFLINE&i<n;i++) {&ENDOFLINE&
			var task = json.tasks[i];	&ENDOFLINE&
			if(task.pID && task.pID != ""){var pID=task.pID;}&ENDOFLINE& else {var pID = 0;&ENDOFLINE&}&ENDOFLINE&
			pID *= 1;&ENDOFLINE&
			if(task.pName && task.pName != ""){var pName=task.pName;}&ENDOFLINE& else {var pName = "No Task Name";&ENDOFLINE&}&ENDOFLINE&
			if(task.pStart && task.pStart != ""){var pStart=task.pStart;}&ENDOFLINE& else {var pStart = "";&ENDOFLINE&}&ENDOFLINE&
			if(task.pEnd && task.pEnd != ""){var pEnd=task.pEnd;}&ENDOFLINE& else {var pEnd = "";&ENDOFLINE&}&ENDOFLINE&
			if(task.pColor && task.pColor != ""){var pColor=task.pColor;}&ENDOFLINE& else {var pColor = '0000ff';}&ENDOFLINE&
			if(task.pLink && task.pLink != ""){var pLink=task.pLink;}&ENDOFLINE& else {var pLink = "";&ENDOFLINE&}&ENDOFLINE&
			if(task.pMile && task.pMile != ""){var pMile=task.pMile;}&ENDOFLINE& else {var pMile = 0;&ENDOFLINE&}&ENDOFLINE&
			pMile  *= 1;&ENDOFLINE&
			if(task.pRes && task.pRes != ""){var pRes=task.pRes;}&ENDOFLINE& else {var pRes = "";&ENDOFLINE&}&ENDOFLINE&	
			if(task.pComp && task.pComp != ""){var pComp=task.pComp;}&ENDOFLINE& else {var pComp = 0;&ENDOFLINE&}&ENDOFLINE&	
			pComp  *= 1;&ENDOFLINE&
			if(task.pGroup && task.pGroup != ""){var pGroup=task.pGroup;}&ENDOFLINE& else {var pGroup = 0;&ENDOFLINE&}&ENDOFLINE&	
			pGroup *= 1;&ENDOFLINE&
			if(task.pParent && task.pParent != ""){var pParent=task.pParent;}&ENDOFLINE& else {var pParent = 0;&ENDOFLINE&}&ENDOFLINE&	
			pParent *= 1;&ENDOFLINE&
			if(task.pOpen && task.pOpen != ""){var pOpen=task.pOpen;}&ENDOFLINE& else {var pOpen = 1;}&ENDOFLINE&
			pOpen *= 1;&ENDOFLINE&
			if(task.pDepend && task.pDepend != ""){var pDepend=task.pDepend;}&ENDOFLINE& else {var pDepend = "";&ENDOFLINE&}&ENDOFLINE&	
			if (pDepend.length==0){pDepend=''}&ENDOFLINE& 
			if(task.pCaption && task.pCaption != ""){var pCaption=task.pCaption;}&ENDOFLINE& else {var pCaption = "";&ENDOFLINE&}&ENDOFLINE&
			if(task.pActionLink && task.pActionLink != ""){var pActionLink=task.pActionLink;}&ENDOFLINE& else {var pActionLink = 0;&ENDOFLINE&}&ENDOFLINE&
			pGanttVar.AddTaskItem(new JSGantt.TaskItem(pID , pName, pStart, pEnd, pColor,  pLink, pMile, pRes,  pComp, pGroup, pParent, pOpen, pDepend,pCaption,pActionLink	));&ENDOFLINE&
	}&ENDOFLINE&
}&ENDOFLINE&
JSGantt.ChromeXMLParse = function (pGanttVar){&ENDOFLINE&
	if (XMLLoader.readyState == 4) {&ENDOFLINE&
		var ta=XMLLoader.responseText.split(/<task>/gi);&ENDOFLINE&
		var n = ta.length;	&ENDOFLINE&
		for(var i=1;i<n;i++) {&ENDOFLINE&
			Task = ta[i].replace(/<[/]p/g, '<p');	&ENDOFLINE&
			var te = Task.split(/<pid>/i);&ENDOFLINE&
			if(te.length> 2){var pID=te[1];}&ENDOFLINE& else {var pID = 0;&ENDOFLINE&}&ENDOFLINE&
			pID *= 1;
			var te = Task.split(/<pName>/i);
			if(te.length> 2){var pName=te[1];}&ENDOFLINE& else {var pName = "No Task Name";&ENDOFLINE&}&ENDOFLINE&
			var te = Task.split(/<pstart>/i);
			if(te.length> 2){var pStart=te[1];}&ENDOFLINE& else {var pStart = "";&ENDOFLINE&}&ENDOFLINE&
			var te = Task.split(/<pEnd>/i);
			if(te.length> 2){var pEnd=te[1];}&ENDOFLINE& else {var pEnd = "";&ENDOFLINE&}&ENDOFLINE&
			var te = Task.split(/<pColor>/i);
			if(te.length> 2){var pColor=te[1];}&ENDOFLINE& else {var pColor = '0000ff';}&ENDOFLINE&
			var te = Task.split(/<pLink>/i);
			if(te.length> 2){var pLink=te[1];}&ENDOFLINE& else {var pLink = "";&ENDOFLINE&}&ENDOFLINE&
			var te = Task.split(/<pMile>/i);
			if(te.length> 2){var pMile=te[1];}&ENDOFLINE& else {var pMile = 0;&ENDOFLINE&}&ENDOFLINE&
			pMile  *= 1;
			var te = Task.split(/<pRes>/i);
			if(te.length> 2){var pRes=te[1];}&ENDOFLINE& else {var pRes = "";&ENDOFLINE&}&ENDOFLINE&	
			var te = Task.split(/<pComp>/i);
			if(te.length> 2){var pComp=te[1];}&ENDOFLINE& else {var pComp = 0;&ENDOFLINE&}&ENDOFLINE&	
			pComp  *= 1;
			var te = Task.split(/<pGroup>/i);
			if(te.length> 2){var pGroup=te[1];}&ENDOFLINE& else {var pGroup = 0;&ENDOFLINE&}&ENDOFLINE&	
			pGroup *= 1;
			var te = Task.split(/<pParent>/i);
			if(te.length> 2){var pParent=te[1];}&ENDOFLINE& else {var pParent = 0;&ENDOFLINE&}&ENDOFLINE&	
			pParent *= 1;
			var te = Task.split(/<pOpen>/i);
			if(te.length> 2){var pOpen=te[1];}&ENDOFLINE& else {var pOpen = 1;}&ENDOFLINE&
			pOpen *= 1;
			var te = Task.split(/<pDepend>/i);
			if(te.length> 2){var pDepend=te[1];}&ENDOFLINE& else {var pDepend = "";&ENDOFLINE&}&ENDOFLINE&	
			if (pDepend.length==0){pDepend=''}&ENDOFLINE& 
			var te = Task.split(/<pCaption>/i);
			if(te.length> 2){var pCaption=te[1];}&ENDOFLINE& else {var pCaption = "";&ENDOFLINE&}&ENDOFLINE&
			var te = Task.split(/<pActionLink>/i);
			if(te.length> 2){var pActionLink=te[1];}&ENDOFLINE& else {var pActionLink = 0;&ENDOFLINE&}&ENDOFLINE&
			pActionLink *= 1;&ENDOFLINE&
			pGanttVar.AddTaskItem(new JSGantt.TaskItem(pID , pName, pStart, pEnd, pColor,  pLink, pMile, pRes,  pComp, pGroup, pParent, pOpen, pDepend,pCaption,pActionLink 	));&ENDOFLINE&
		}&ENDOFLINE&
	}&ENDOFLINE&
}&ENDOFLINE&
JSGantt.benchMark = function(pItem){&ENDOFLINE&
   var vEndTime=new Date().getTime();&ENDOFLINE&
   alert(pItem + ': Elapsed time: '+((vEndTime-vBenchTime)/1000)+' seconds.');&ENDOFLINE&
   vBenchTime=new Date().getTime();&ENDOFLINE&
}&ENDOFLINE&