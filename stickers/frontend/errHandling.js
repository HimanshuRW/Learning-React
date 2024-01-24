//login page
if case of any error --
send with status other then 200-299 with json as {msg : '----'}
return err from action = {
    for : "login",
    msg : "kyu login fail hua"
}
// if all fine --
send reposnse with status ok with json as {token : "token"}
and return redirect home


// register page
if case of any error --
send with status other then 200-299 with json as {msg : '----'}
return err from action = { 
    for : "register",
    msg : reponseData.msg
}
// if all fine --
return with ok status and json { token : "----------"} from backend
so action can return redirect home



// socket
emit newprice value as someone buy or sell coin , and this would case rerender of side part with new value of coin
// socket - graph
every half an hour when graph update at db.. it emit new data to rerender the graph