cd "C:\Users\86151\Desktop\IMS\p5mirror-Maelyn\downloads/../p5projects"
#
echo unzip 1 "s4i3-TO7VdiwPk"
rm -rf "./s4i3-TO7VdiwPk"
mkdir "./s4i3-TO7VdiwPk"
pushd "./s4i3-TO7VdiwPk" > /dev/null
unzip -q "../../downloads/zips/s4i3-TO7VdiwPk"
popd > /dev/null
#
echo unzip 2 "小梅躲男孩-arduino版-kK22N4wwb"
rm -rf "./小梅躲男孩-arduino版-kK22N4wwb"
mkdir "./小梅躲男孩-arduino版-kK22N4wwb"
pushd "./小梅躲男孩-arduino版-kK22N4wwb" > /dev/null
unzip -q "../../downloads/zips/小梅躲男孩-arduino版-kK22N4wwb"
popd > /dev/null
#
echo unzip 3 "s2i1-WmtXSfuUi"
rm -rf "./s2i1-WmtXSfuUi"
mkdir "./s2i1-WmtXSfuUi"
pushd "./s2i1-WmtXSfuUi" > /dev/null
unzip -q "../../downloads/zips/s2i1-WmtXSfuUi"
popd > /dev/null
#
echo unzip 4 "女孩背包-bQYvhMbjR"
rm -rf "./女孩背包-bQYvhMbjR"
mkdir "./女孩背包-bQYvhMbjR"
pushd "./女孩背包-bQYvhMbjR" > /dev/null
unzip -q "../../downloads/zips/女孩背包-bQYvhMbjR"
popd > /dev/null
#
echo unzip 5 "没被杰克夸气疯了自己在这做着玩 copy-GRSXWYunV"
rm -rf "./没被杰克夸气疯了自己在这做着玩 copy-GRSXWYunV"
mkdir "./没被杰克夸气疯了自己在这做着玩 copy-GRSXWYunV"
pushd "./没被杰克夸气疯了自己在这做着玩 copy-GRSXWYunV" > /dev/null
unzip -q "../../downloads/zips/没被杰克夸气疯了自己在这做着玩 copy-GRSXWYunV"
popd > /dev/null
#
echo unzip 6 "2025.4.12 ims-Rz8EdTg1t"
rm -rf "./2025.4.12 ims-Rz8EdTg1t"
mkdir "./2025.4.12 ims-Rz8EdTg1t"
pushd "./2025.4.12 ims-Rz8EdTg1t" > /dev/null
unzip -q "../../downloads/zips/2025.4.12 ims-Rz8EdTg1t"
popd > /dev/null
#
echo unzip 7 "3.14 Assignment-aHmLOV_uZ"
rm -rf "./3.14 Assignment-aHmLOV_uZ"
mkdir "./3.14 Assignment-aHmLOV_uZ"
pushd "./3.14 Assignment-aHmLOV_uZ" > /dev/null
unzip -q "../../downloads/zips/3.14 Assignment-aHmLOV_uZ"
popd > /dev/null
#
echo unzip 8 "小梅躲男孩-mouse版-jM0GsZXNj"
rm -rf "./小梅躲男孩-mouse版-jM0GsZXNj"
mkdir "./小梅躲男孩-mouse版-jM0GsZXNj"
pushd "./小梅躲男孩-mouse版-jM0GsZXNj" > /dev/null
unzip -q "../../downloads/zips/小梅躲男孩-mouse版-jM0GsZXNj"
popd > /dev/null
#
echo unzip 9 "没被杰克夸气疯了自己在这做着玩-t8wFhNPlY"
rm -rf "./没被杰克夸气疯了自己在这做着玩-t8wFhNPlY"
mkdir "./没被杰克夸气疯了自己在这做着玩-t8wFhNPlY"
pushd "./没被杰克夸气疯了自己在这做着玩-t8wFhNPlY" > /dev/null
unzip -q "../../downloads/zips/没被杰克夸气疯了自己在这做着玩-t8wFhNPlY"
popd > /dev/null
#
echo unzip 10 "2025.4.4 inclass handpose-S2Y2UYn-Gf"
rm -rf "./2025.4.4 inclass handpose-S2Y2UYn-Gf"
mkdir "./2025.4.4 inclass handpose-S2Y2UYn-Gf"
pushd "./2025.4.4 inclass handpose-S2Y2UYn-Gf" > /dev/null
unzip -q "../../downloads/zips/2025.4.4 inclass handpose-S2Y2UYn-Gf"
popd > /dev/null
#
echo unzip 11 "greenface v4-WCPM4XE2A"
rm -rf "./greenface v4-WCPM4XE2A"
mkdir "./greenface v4-WCPM4XE2A"
pushd "./greenface v4-WCPM4XE2A" > /dev/null
unzip -q "../../downloads/zips/greenface v4-WCPM4XE2A"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi