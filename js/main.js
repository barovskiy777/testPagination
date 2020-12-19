window.addEventListener("DOMContentLoaded", function () {

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((responce) => {
            let data = responce.json()

            return data
        })
        .then((data) => {
            // вывод товаров на страницу
            // <--
            let out = ""

            for (key in data) {
                if (data.hasOwnProperty(key)) {

                    out += `
                        <div class="pagination-content__item">
                            <div class="pagination-content__inner-wrapper">
                            
                                <div class="pagination-content__text">${data[key].id + "." + data[key].title}</div>
                                <div class="pagination-content__body">${data[key].body}</div>
                            </div>
                        </div>
                    `

                }

            }

            // элемент на странице в который выводим товары
            let $paginationContentWrapper = document.querySelector(".pagination-content__wrapper")
            //вывод на страницу изображений полученных с сервера
            $paginationContentWrapper.innerHTML = out
            // -->


            //получаем все товары
            let $postItems = document.querySelectorAll(".pagination-content__item")
            // товаров на странице
            let postOnPade = 6;
            // общее кол-во товаров
            let quantityPost = $postItems.length
            // количество страниц товара для пагинации
            let quantityPaginationButtons = Math.ceil(quantityPost / postOnPade)

            // рендер кнопок для погинации
            renderButtons(quantityPaginationButtons)
            // рендер первой страницы в пагинации
            renderPosts($postItems, 0, postOnPade, $paginationContentWrapper)

            let $paginationButtons = document.querySelectorAll('.pagination__item')

            Array.prototype.forEach.call($paginationButtons, (item) => {
                item.addEventListener("click", function (e) {
                    Array.prototype.forEach.call($paginationButtons, item => {
                        if (item.classList.contains("_active")) {
                            item.classList.remove("_active")
                        }
                    })

                    this.classList.add("_active")

                    let $paginationNotExtremeButtons = document.querySelectorAll(".pagination__item--not-extreme")

                    // логика отображения кнопок при нажании на некрайние кнопки
                    if (this.dataset.id > 1 && this.dataset.id < quantityPaginationButtons - 3) {
                        // удаляем класс _show у всеx кномок, кроме первой и последней
                        for (let $item of $paginationNotExtremeButtons) {
                            if ($item.classList.contains("_show")) {
                                $item.classList.remove("_show")
                            }

                        }

                        //dataId нажатой кнопки
                        let currentDataId = +this.dataset.id
                        //dataId следующей посли нажатой кнопки
                        let nextDataId = currentDataId + 1
                        //dataId предыдущей посли нажатой кнопки
                        let prevDataId = currentDataId - 1


                        for ($item of $paginationButtons) {
                            console.log("item.id = ", $item.dataset.id)
                            if ($item.dataset.id == currentDataId || $item.dataset.id == nextDataId || $item.dataset.id == (nextDataId + 1) || $item.dataset.id == prevDataId || $item.dataset.id == (prevDataId - 1)) {
                                console.log("new ", $item.dataset.id)
                                $item.classList.add("_show")
                            }
                        }

                    }

                    if (this.dataset.id == 0) {
                        // удаляем класс _show у всеx кномок, кроме первой и последней
                        for (let $item of $paginationNotExtremeButtons) {
                            if ($item.classList.contains("_show")) {
                                $item.classList.remove("_show")
                            }
                        }

                        for (let i = 1; i <= 3; i++) {
                            let selector = `.pagination__item[data-id="${i}"]`;
                            document.querySelector(selector).classList.add("_show")
                        }
                    }

                    if (this.dataset.id == quantityPaginationButtons - 1) {
                        // удаляем класс _show у всеx кномок, кроме первой и последней
                        for (let $item of $paginationNotExtremeButtons) {
                            if ($item.classList.contains("_show")) {
                                $item.classList.remove("_show")
                            }
                        }

                        for (let i = 2; i <= 4; i++) {
                            let selector = `.pagination__item[data-id="${quantityPaginationButtons - i}"]`;
                            document.querySelector(selector).classList.add("_show")
                        }
                    }


                    //получаем ID текущей активной кнопки
                    let activeBtnPaginationDataID = document.querySelector(".pagination__item._active").dataset.id;

                    // показ-скрытие точек перед крайними кнопками пагинации
                    if (quantityPaginationButtons > 5) {

                        // логика появления точек после первой кнопкой пагинации
                        if (activeBtnPaginationDataID > 2) document.querySelector(".pagination__dots--start").classList.add("_active")
                        else document.querySelector(".pagination__dots--start").classList.remove("_active")

                        // логика появления точек перед последней кнопкой пагинации
                        if (activeBtnPaginationDataID < quantityPaginationButtons - 5) document.querySelector(".pagination__dots--end").classList.add("_active")
                        else document.querySelector(".pagination__dots--end").classList.remove("_active")
                    }




                    // рендер страницы товаров после нажатие на кнопку пагинации
                    renderPosts($postItems, this.dataset.id, postOnPade, $paginationContentWrapper)
                })
            })

            let arrowLeftPagination = document.querySelector('#pagination__arrow--left'),
                arrowRightPagination = document.querySelector('#pagination__arrow--right')

            // показ скрытие скрелок вперед назад
            // <--
            if (activeBtnPaginationDataID == 0) arrowLeftPagination.classList.remove("_active")
            else document.querySelector('#pagination__arrow--left').classList.add("_active")

            if (activeBtnPaginationDataID == quantityPaginationButtons - 1) arrowRightPagination.classList.remove("_active")
            else document.querySelector('#pagination__arrow--right').classList.add("_active")
            // -->

            // добавляем событие на стрелки для листания страниц вперед-назад
            arrowLeftPagination.addEventListener("click", function () {
                //получаем id текущей активной кнопки
                let activeBtnPaginationDataID = document.querySelector(".pagination__item._active").dataset.id;

            })


        }).catch(e => console.error("Error", e))





})

function renderPosts($elements, index, quantity, $target) {
    let startIndex = index * quantity
    let array = Array.from($elements)

    array = array.slice(startIndex, startIndex + quantity)


    $target.innerHTML = ""
    for ($item of array) {

        $target.appendChild($item)
    }

}

function renderButtons(quantityPaginationButtons) {
    let outButtons = ""

    for (let i = 0; i < quantityPaginationButtons; i++) {
        let classShow = ""
        if (i < 4) classShow = "_show";

        if (i == 0) {

            outButtons += `
            <div class="pagination__arrow pagination__arrow--left" id='pagination__arrow--left'>&#10094;</div>
            <div class="pagination__item _active" id="pagination-first-item"  data-id="${i}">${i + 1}</div>`
            if (quantityPaginationButtons > 5) outButtons += '<div class="pagination__dots pagination__dots--start"><span>...</span></div>'

        } else if (i == quantityPaginationButtons - 1) {


            if (quantityPaginationButtons > 5) outButtons += '<div class="pagination__dots pagination__dots--end _active" > <span>...</span></div>'

            outButtons += `<div class="pagination__item" id="pagination-last-item" data-id="${i}">${i + 1}</div>
                            <div class="pagination__arrow pagination__arrow--right _active" id='pagination__arrow--right'>&#10095;</div>
                            `
        } else {

            outButtons += `<div class="pagination__item ${classShow} pagination__item--not-extreme" data-id="${i}" > ${i + 1}</div> 	`
        }
    }

    let pagination = document.querySelector(".pagination")

    pagination.innerHTML = outButtons
}