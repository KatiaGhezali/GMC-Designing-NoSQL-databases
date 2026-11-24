print("\n========== REPLICA SET CONFIGURATION ==========");
printjson(rs.conf());

print("\n========== REPLICA SET STATUS ==========");
printjson(rs.status());

print("\nReplica set inspection completed.");
