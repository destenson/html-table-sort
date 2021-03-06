var tableHeaders = document.querySelectorAll('th');
var sortAsc = true;
var sortEnabled = true;

for (j = 0; j < tableHeaders.length; ++j) {
  tableHeaders.item(j).onclick = function() {

    var tableObj = findParentNode('TABLE',this);
    var index = [].indexOf.call(this.parentNode.children, this);
    var nodeList = tableObj.querySelectorAll('tr');
    var nodeArray = [].slice.call(nodeList);

    // Remove from selection up to and including clicked TR
    while (nodeArray[0] != findParentNode('TR',this)){
      nodeArray.splice(0,1);
    }
    nodeArray.splice(0,1);

    nodeArray.sort(function(a, b) {
      a = a.querySelectorAll('td').item(index);
      b = b.querySelectorAll('td').item(index);
      return sortAlphaNum(a.innerHTML,b.innerHTML);
    });

    if (!sortAsc) {
      nodeArray.reverse();
    }
    sortAsc = !sortAsc;

    if (sortEnabled) {
      for (i = 0; i < nodeArray.length; ++i) {
        tableObj.appendChild(nodeArray[i]);
      }
    }
  }
}

function findParentNode(parentName, childObj) {
  var testObj = childObj.parentNode;
  while(testObj.tagName != parentName) {
    testObj = testObj.parentNode;
  }
  return testObj;
}

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
function sortAlphaNum(a,b) {
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if(aA === bA) {
        var aN = parseInt(a.replace(reN, ""), 10);
        var bN = parseInt(b.replace(reN, ""), 10);
        if (isNaN(aN)){
          aN = 0;
        }
        if (isNaN(bN)){
          bN = 0;
        }
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
}
