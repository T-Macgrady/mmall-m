# @Author: 15156
# @Date:   2018-05-31 13:20:24
# @Last Modified by:   15156
# @Last Modified time: 2018-05-31 14:00:27


GIT_HOME=/developer/git-repository/
DEST_PATH=/product/front/

if [ ! -n "$1" ];
then
    echo -e "Please input a project name! You can input as follows:"
    echo -e "./fe-deploy.sh mmall-m"
    exit
fi

if [ $1 = "mmall-m" ];
	then
	    echo -e "---------Enter mmall-m--------"
	    cd $GIT_HOME$1
elif [ $1 = "admin-fe" ];
	then
	    echo -e "---------Enter admin-fe--------"
	    cd $GIT_HOME$1
else
	    echo -e "Invalid Project Name!"
	    exit
fi

# clean dist
echo -e "---------Clean Dist--------"
rm -rf ./dist

echo -e "---------Git Checkout Master--------"
git checkout master

echo -e "---------Git Pull--------"
git pull

echo -e "---------Yarn Install--------"
yarn

echo -e "---------Yarn Run Dist--------"
yarn run dist

if [ -d "./dist" ];
then
	# bakeup dest
    echo -e "---------Dest Bakeup--------"
    mv $DEST_PATH/dist $DEST_PATH/dist.bak

    echo -e "---------clean Dest--------"
    rm -rf $DEST_PATH/$1/dist

    echo -e "---------copy Dest--------"
    cp -R ./dist $DEST_PATH/$1/

    echo -e "---------Deploy Success--------"
else
    echo -e "---------Deploy Fail--------"
fi